import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "the-mirrorr-fallback-secret-2026";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.cookies?.the_mirrorr_admin_token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required. Please sign in to access the admin portal.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    // Verify user still exists in database
    prisma.adminUser
      .findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true },
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            success: false,
            error: "Admin user session invalid or revoked.",
          });
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error("Auth DB Error:", err);
        return res.status(500).json({ success: false, error: "Database error during authentication." });
      });
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Session expired. Please log in again.",
      });
    }
    return res.status(401).json({
      success: false,
      error: "Invalid authentication token.",
    });
  }
}

export function generateToken(user: AuthenticatedUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}
