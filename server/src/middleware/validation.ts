import { z } from "zod";

// Helper to strip script/HTML tags
export function sanitizeText(val: string): string {
  if (!val) return "";
  return val.replace(/<[^>]*>?/gm, "").trim();
}

// 1. Public Enquiry Schema
export const enquirySchema = z.object({
  customerName: z
    .string({ required_error: "Name is required." })
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name cannot exceed 80 characters.")
    .transform(sanitizeText),

  contactMethod: z
    .string({ required_error: "Please provide a valid phone number or email address." })
    .min(5, "Contact details must be at least 5 characters.")
    .max(100, "Contact details cannot exceed 100 characters.")
    .transform(sanitizeText)
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneDigits = val.replace(/\D/g, "");
      return emailRegex.test(val) || phoneDigits.length >= 8;
    }, {
      message: "Please enter a valid phone number (at least 8 digits) or a valid email address.",
    }),

  selectedService: z
    .string()
    .max(100, "Service name cannot exceed 100 characters.")
    .optional()
    .nullable()
    .transform((val) => (val ? sanitizeText(val) : null)),

  preferredTime: z
    .string()
    .max(60, "Preferred time slot cannot exceed 60 characters.")
    .optional()
    .nullable()
    .transform((val) => (val ? sanitizeText(val) : null)),

  message: z
    .string()
    .max(1000, "Message cannot exceed 1,000 characters.")
    .optional()
    .nullable()
    .transform((val) => (val ? sanitizeText(val) : null)),
});

// 2. Admin Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format.").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// 3. Service Schema (Admin)
export const serviceSchema = z.object({
  name: z.string().min(2).max(100).transform(sanitizeText),
  slug: z.string().min(2).max(100).transform(sanitizeText),
  category: z.string().min(2).max(50).transform(sanitizeText),
  description: z.string().min(10).max(500).transform(sanitizeText),
  detailedContent: z.string().min(20).max(5000).transform(sanitizeText),
  price: z.string().max(50).optional().nullable().transform((val) => (val ? sanitizeText(val) : null)),
  imagePath: z.string().max(255).optional().nullable(),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  features: z.string().optional().nullable(), // JSON string
  tags: z.string().optional().nullable(),     // JSON string
});

// 4. Gallery Schema (Admin)
export const gallerySchema = z.object({
  imagePath: z.string().min(1, "Image path is required."),
  altText: z.string().min(3).max(200).transform(sanitizeText),
  category: z.string().min(2).max(50).transform(sanitizeText),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  caption: z.string().max(200).optional().nullable().transform((val) => (val ? sanitizeText(val) : null)),
});

// 5. Salon Settings Schema (Admin)
export const salonSettingsSchema = z.object({
  salonName: z.string().min(2).max(100).transform(sanitizeText),
  tagline: z.string().max(150).transform(sanitizeText),
  address: z.string().min(10).max(300).transform(sanitizeText),
  phone: z.string().min(8).max(30).transform(sanitizeText),
  email: z.string().email("Invalid email").transform(sanitizeText),
  lat: z.number(),
  lng: z.number(),
  googleMapsUrl: z.string().url().max(500),
});
