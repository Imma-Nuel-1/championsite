import { Request, Response } from "express";
import Admin from "../models/admin";
import { signToken } from "../utils/jwt";
import { UserRole } from "../middleware/auth";

// ✅ Get all admins (excluding passwords)
export const getAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.json({ success: true, data: admins });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch admins" });
  }
};

// ✅ Create admin (for superadmin use)
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, email, password });

    return res.status(201).json({
      success: true,
      data: admin.toSafeObject(),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating admin" });
  }
};

// ✅ Admin login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Map the database role ('Admin', 'SuperAdmin') to the UserRole enum ('admin')
    const userRole =
      admin.role.toLowerCase() === "admin" ||
      admin.role.toLowerCase() === "superadmin"
        ? UserRole.ADMIN
        : UserRole.USER;

    // Create a complete token payload
    const token = signToken({
      id: admin._id.toString(),
      email: admin.email,
      role: userRole,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: admin.toSafeObject(),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to log in" });
  }
};
