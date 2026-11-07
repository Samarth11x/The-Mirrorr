import { Router, Request, Response } from "express";
import prisma from "../prisma.js";
import { enquirySchema } from "../middleware/validation.js";
import rateLimit from "express-rate-limit";

const router = Router();

// Rate limiter for public enquiry submissions (max 10 submissions per 15 minutes per IP)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many enquiries submitted from this network. Please try again after 15 minutes or call us directly at +91 80883 23885.",
  },
});

// 1. Get Salon Settings & Contact Info
router.get("/settings", async (req: Request, res: Response) => {
  try {
    let settings = await prisma.salonSetting.findUnique({
      where: { id: "default-settings" },
    });

    if (!settings) {
      // Create defaults if not yet seeded
      settings = await prisma.salonSetting.create({
        data: { id: "default-settings" },
      });
    }

    return res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res.status(500).json({ success: false, error: "Failed to retrieve salon settings." });
  }
});

// 2. Get All Active Services
router.get("/services", async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    // Parse features and tags JSON strings for client convenience
    const formatted = services.map((s) => ({
      ...s,
      features: s.features ? JSON.parse(s.features) : [],
      tags: s.tags ? JSON.parse(s.tags) : [],
    }));

    return res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({ success: false, error: "Failed to retrieve services." });
  }
});

// 3. Get Single Service by Slug
router.get("/services/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service || !service.active) {
      return res.status(404).json({ success: false, error: "Service not found." });
    }

    return res.json({
      success: true,
      data: {
        ...service,
        features: service.features ? JSON.parse(service.features) : [],
        tags: service.tags ? JSON.parse(service.tags) : [],
      },
    });
  } catch (error) {
    console.error("Error fetching service detail:", error);
    return res.status(500).json({ success: false, error: "Failed to retrieve service details." });
  }
});

// 4. Get Active Gallery Items
router.get("/gallery", async (req: Request, res: Response) => {
  try {
    const items = await prisma.galleryItem.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return res.status(500).json({ success: false, error: "Failed to retrieve gallery items." });
  }
});

// 5. Submit an Enquiry
router.post("/enquiries", enquiryLimiter, async (req: Request, res: Response) => {
  try {
    const validation = enquirySchema.safeParse(req.body);

    if (!validation.success) {
      const errorMsg = validation.error.errors.map((e) => e.message).join(" ");
      return res.status(400).json({
        success: false,
        error: errorMsg,
        details: validation.error.format(),
      });
    }

    const { customerName, contactMethod, selectedService, preferredTime, message } = validation.data;

    // Detect if contactMethod contains email or phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactMethod);
    const email = isEmail ? contactMethod : null;
    const phone = !isEmail ? contactMethod : null;

    const enquiry = await prisma.enquiry.create({
      data: {
        customerName,
        contactMethod,
        email,
        phone,
        selectedService: selectedService || null,
        preferredTime: preferredTime || null,
        message: message || null,
        status: "new",
      },
    });

    return res.status(201).json({
      success: true,
      message:
        "Thank you! THE MIRRORR salon team has received your enquiry and will contact you directly to discuss pricing, consultation details, and timing.",
      data: {
        id: enquiry.id,
        customerName: enquiry.customerName,
        contactMethod: enquiry.contactMethod,
        selectedService: enquiry.selectedService,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to process your enquiry at this moment. Please call us directly at +91 80883 23885.",
    });
  }
});

export default router;
