import { Router, Request, Response } from "express";
import Admin from "../models/admin";
import { signToken } from "../utils/jwt";
import { UserRole } from "../middleware/auth";

const router = Router();

// REGISTER route
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const newAdmin = new Admin({
      email,
      password,
      name,
      role: role || "Admin", // Use capitalized Admin for the Admin model
    });

    await newAdmin.save();

    // Map admin role to UserRole enum for JWT
    const userRole =
      (role || "Admin").toLowerCase() === "admin" ||
      (role || "Admin").toLowerCase() === "superadmin"
        ? UserRole.ADMIN
        : UserRole.USER;

    const token = signToken({
      id: newAdmin._id.toString(),
      email: newAdmin.email,
      role: userRole,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN route
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // ✅ Fix: select password explicitly because it's excluded by default in schema
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Map admin role to UserRole enum
    const userRole =
      admin.role.toLowerCase() === "admin" ||
      admin.role.toLowerCase() === "superadmin"
        ? UserRole.ADMIN
        : UserRole.USER;

    const token = signToken({
      id: admin._id.toString(),
      email: admin.email,
      role: userRole,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
