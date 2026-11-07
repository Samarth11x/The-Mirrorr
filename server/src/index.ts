import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import publicRoutes from "./routes/publicRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

export const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET || "the-mirrorr-secret"));

// Serve Static Assets (Images & Media)
app.use("/assets", express.static(path.join(projectRoot, "assets")));

// API Endpoints
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    salon: "THE MIRRORR Unisex Hair & Beauty Studio",
    timestamp: new Date().toISOString(),
  });
});

// Serve Frontend in Production / Built mode
const clientDist = path.join(projectRoot, "client/dist");
app.use(express.static(clientDist));

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/assets")) {
    return next();
  }
  const indexPath = path.join(clientDist, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      // If client not yet built, return a clean API index message
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>THE MIRRORR API</title></head>
        <body style="font-family:sans-serif; text-align:center; padding:50px;">
          <h2>THE MIRRORR Unisex Hair & Beauty Studio API Server</h2>
          <p>API is active on port ${PORT}.</p>
          <p><a href="/api/services">/api/services</a> | <a href="/api/settings">/api/settings</a> | <a href="/api/gallery">/api/gallery</a></p>
        </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error." : err.message,
  });
});

// Start listening if run directly
if (process.argv[1]?.endsWith("index.ts") || process.argv[1]?.endsWith("index.js")) {
  app.listen(PORT, () => {
    console.log(`THE MIRRORR Full-Stack Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
