import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../src/models/Admin";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env["MONGO_URI"] || "");
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@a.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Secure@12345", salt);

    const admin = new Admin({
      email: "admin@a.com",
      name: "Admin",
      password: hashedPassword,
      role: "Admin", // Ensure we use the correct role value
    });

    await admin.save();
    console.log("Admin user created successfully");
    console.log("Email: admin@a.com");
    console.log("Password: Secure@12345");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdmin();
