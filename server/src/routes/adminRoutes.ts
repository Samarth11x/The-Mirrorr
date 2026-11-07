import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { requireAdmin, generateToken } from "../middleware/auth.js";
import {
  loginSchema,
  serviceSchema,
  gallerySchema,
  salonSettingsSchema,
} from "../middleware/validation.js";

const router = Router();

// ==============================================================================
// 1. Authentication Endpoints
// ==============================================================================

router.post("/login", async (req: Request, res: Response) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const { email, password } = validation.data;

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Set secure HTTP-only cookie
    res.cookie("the_mirrorr_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "Sign in successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: "Internal server error during login." });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("the_mirrorr_admin_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ success: true, message: "Logged out successfully." });
});

router.get("/me", requireAdmin, (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

// ==============================================================================
// 2. Enquiries Management (Protected)
// ==============================================================================

router.get("/enquiries", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;

    const where: any = {};
    if (status && typeof status === "string" && status !== "all") {
      where.status = status;
    }
    if (search && typeof search === "string") {
      where.OR = [
        { customerName: { contains: search } },
        { contactMethod: { contains: search } },
        { selectedService: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({ success: false, error: "Failed to load enquiries." });
  }
});

router.patch("/enquiries/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData: any = {};
    if (status) {
      if (!["new", "contacted", "closed"].includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Status must be either 'new', 'contacted', or 'closed'.",
        });
      }
      updateData.status = status;
    }
    if (notes !== undefined) {
      updateData.notes = typeof notes === "string" ? notes.trim() : null;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });

    return res.json({
      success: true,
      message: "Enquiry updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return res.status(500).json({ success: false, error: "Failed to update enquiry." });
  }
});

router.delete("/enquiries/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.enquiry.delete({ where: { id } });
    return res.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return res.status(500).json({ success: false, error: "Failed to delete enquiry." });
  }
});

// ==============================================================================
// 3. Services Management (Protected)
// ==============================================================================

router.get("/services", requireAdmin, async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return res.json({ success: true, data: services });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch services." });
  }
});

router.post("/services", requireAdmin, async (req: Request, res: Response) => {
  try {
    const validation = serviceSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const created = await prisma.service.create({
      data: validation.data,
    });
    return res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ success: false, error: "A service with this slug already exists." });
    }
    return res.status(500).json({ success: false, error: "Failed to create service." });
  }
});

router.put("/services/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = serviceSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const updated = await prisma.service.update({
      where: { id },
      data: validation.data,
    });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to update service." });
  }
});

router.delete("/services/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    return res.json({ success: true, message: "Service removed." });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to delete service." });
  }
});

// ==============================================================================
// 4. Gallery Items Management (Protected)
// ==============================================================================

router.get("/gallery", requireAdmin, async (req: Request, res: Response) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return res.json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch gallery items." });
  }
});

router.post("/gallery", requireAdmin, async (req: Request, res: Response) => {
  try {
    const validation = gallerySchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const created = await prisma.galleryItem.create({
      data: validation.data,
    });
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to add gallery item." });
  }
});

router.put("/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = gallerySchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const updated = await prisma.galleryItem.update({
      where: { id },
      data: validation.data,
    });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to update gallery item." });
  }
});

router.delete("/gallery/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.galleryItem.delete({ where: { id } });
    return res.json({ success: true, message: "Gallery item removed." });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to delete gallery item." });
  }
});

// ==============================================================================
// 5. Salon Settings (Protected)
// ==============================================================================

router.get("/settings", requireAdmin, async (req: Request, res: Response) => {
  try {
    const settings = await prisma.salonSetting.findUnique({
      where: { id: "default-settings" },
    });
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch settings." });
  }
});

router.put("/settings", requireAdmin, async (req: Request, res: Response) => {
  try {
    const validation = salonSettingsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: validation.error.errors.map((e) => e.message).join(" "),
      });
    }

    const updated = await prisma.salonSetting.upsert({
      where: { id: "default-settings" },
      update: validation.data,
      create: {
        id: "default-settings",
        ...validation.data,
      },
    });

    return res.json({
      success: true,
      message: "Salon settings updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ success: false, error: "Failed to update salon settings." });
  }
});

export default router;
