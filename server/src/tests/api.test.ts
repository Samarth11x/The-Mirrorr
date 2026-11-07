import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../index.js";
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";

describe("THE MIRRORR Public API & Verification Tests", () => {
  beforeAll(async () => {
    // Ensure test admin exists
    const passwordHash = await bcrypt.hash("TestPass123!", 10);
    await prisma.adminUser.upsert({
      where: { email: "testadmin@themirrorr.com" },
      update: { passwordHash },
      create: {
        email: "testadmin@themirrorr.com",
        name: "Test Admin",
        passwordHash,
        role: "admin",
      },
    });
  });

  // 1. Health check & Frontend Serving
  it("GET /api/health should return ok status and salon identifier", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.salon).toBe("THE MIRRORR Unisex Hair & Beauty Studio");
  });

  it("GET / should serve the built React frontend application", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("THE MIRRORR");
    expect(res.text).toContain("root");
  });

  // 2. Settings
  it("GET /api/settings should return verified address, phone, email, and coordinates", async () => {
    const res = await request(app).get("/api/settings");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.salonName).toBe("THE MIRRORR Unisex Hair & Beauty Studio");
    expect(res.body.data.phone).toBe("+91 80883 23885");
    expect(res.body.data.email).toBe("themirrorr2024@gmail.com");
    expect(res.body.data.address).toContain("Hosa Road");
    expect(res.body.data.lat).toBeCloseTo(12.818598, 4);
    expect(res.body.data.lng).toBeCloseTo(77.747615, 4);
  });

  // 3. Services
  it("GET /api/services should return 4 verified services with unpriced status", async () => {
    const res = await request(app).get("/api/services");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(4);

    const slugs = res.body.data.map((s: any) => s.slug);
    expect(slugs).toContain("women-hair-cut");
    expect(slugs).toContain("women-hair-color");
    expect(slugs).toContain("massage");
    expect(slugs).toContain("body-polishing");

    // Check pricing: no numeric pricing fabricated
    res.body.data.forEach((s: any) => {
      expect(s.price).toBeNull();
    });
  });

  // 4. Service Detail
  it("GET /api/services/massage should include Swedish, deep tissue, hot stone, and aromatherapy", async () => {
    const res = await request(app).get("/api/services/massage");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const content = res.body.data.detailedContent.toLowerCase();
    expect(content).toContain("swedish");
    expect(content).toContain("deep tissue");
    expect(content).toContain("hot stone");
    expect(content).toContain("aromatherapy");
  });

  // 5. Gallery
  it("GET /api/gallery should return verified gallery items including authentic studio visuals", async () => {
    const res = await request(app).get("/api/gallery");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(13);
  });

  // 6. Enquiry Validation & Submission
  it("POST /api/enquiries should reject empty or invalid contact details", async () => {
    const res = await request(app)
      .post("/api/enquiries")
      .send({
        customerName: "A",
        contactMethod: "123", // Too short
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/enquiries should accept valid enquiry and return confirmation message", async () => {
    const res = await request(app)
      .post("/api/enquiries")
      .send({
        customerName: "Ananya Sharma",
        contactMethod: "+91 98765 43210",
        selectedService: "Massage Therapy",
        preferredTime: "Morning",
        message: "Inquiring about Swedish and hot stone massage sessions.",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("received your enquiry");
    expect(res.body.message).not.toContain("appointment booked");
    expect(res.body.data.customerName).toBe("Ananya Sharma");
  });
});

describe("THE MIRRORR Admin Authentication & Protected Endpoints", () => {
  let adminToken = "";

  it("POST /api/admin/login should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/admin/login")
      .send({
        email: "testadmin@themirrorr.com",
        password: "WrongPassword123!",
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/admin/login should authenticate valid admin and set cookie", async () => {
    const res = await request(app)
      .post("/api/admin/login")
      .send({
        email: "testadmin@themirrorr.com",
        password: "TestPass123!",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;

    // Verify Set-Cookie header
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("the_mirrorr_admin_token");
  });

  it("GET /api/admin/enquiries should block unauthenticated requests with 401", async () => {
    const res = await request(app).get("/api/admin/enquiries");
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/admin/enquiries should allow authorized admin and return enquiries list", async () => {
    const res = await request(app)
      .get("/api/admin/enquiries")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });

  it("PATCH /api/admin/enquiries/:id should update enquiry status and staff notes", async () => {
    // Fetch latest enquiry
    const list = await request(app)
      .get("/api/admin/enquiries")
      .set("Authorization", `Bearer ${adminToken}`);

    const targetId = list.body.data[0].id;

    const res = await request(app)
      .patch(`/api/admin/enquiries/${targetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "contacted",
        notes: "Called client; discussed Swedish massage availability for this weekend.",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("contacted");
    expect(res.body.data.notes).toContain("Called client");
  });

  it("PUT /api/admin/settings should allow authorized update of salon settings", async () => {
    const current = await request(app).get("/api/settings");
    const original = current.body.data;

    const res = await request(app)
      .put("/api/admin/settings")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        salonName: original.salonName,
        tagline: "Premier Unisex Studio in Hosa Road",
        address: original.address,
        phone: original.phone,
        email: original.email,
        lat: original.lat,
        lng: original.lng,
        googleMapsUrl: original.googleMapsUrl,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tagline).toBe("Premier Unisex Studio in Hosa Road");
  });
});
