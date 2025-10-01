// 🗑️ **REVIEW COMMENT**: REDUNDANT SCRIPT - This duplicates functionality in /backend/scripts/createAdmin.ts
// ⚠️ **DUPLICATE FUNCTIONALITY** - Choose one admin creation script and delete the others
//
// DIFFERENCES:
// - This script: Uses "admin@example.com"
// - /scripts/createAdmin.ts: Uses "admin@a.com"
// - Different folder locations: /src/scripts/ vs /scripts/
//
// RECOMMENDATION: Consolidate into ONE script in ONE location

import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

const createFirstAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const admin = new Admin({
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin user created successfully");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createFirstAdmin();
