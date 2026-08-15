import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../src/models/Admin";
import readline from "readline";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env["MONGO_URI"] || "");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const createAdmin = async () => {
  console.log("\n🔧 CREATE NEW ADMIN");
  console.log("==================");

  const email = await question("Enter admin email: ");
  const name = await question("Enter admin name: ");
  const password = await question("Enter admin password: ");
  const role = await question("Enter role (Admin/SuperAdmin): ");

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log("❌ Admin user already exists with this email");
    return;
  }

  try {
    // Create new admin (password will be auto-hashed by model)
    const admin = new Admin({
      email,
      name,
      password, // Let the model handle hashing
      role: role || "Admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔑 Role: ${role || "Admin"}`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  }
};

const listAdmins = async () => {
  console.log("\n📋 ALL ADMIN USERS");
  console.log("==================");

  try {
    const admins = await Admin.find().select("-password");

    if (admins.length === 0) {
      console.log("No admin users found");
      return;
    }

    admins.forEach((admin, index) => {
      console.log(
        `${index + 1}. ${admin.name} (${admin.email}) - Role: ${admin.role}`
      );
    });
    console.log(`\nTotal: ${admins.length} admin(s)`);
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
  }
};

const updateAdminRole = async () => {
  console.log("\n🔄 UPDATE ADMIN ROLE");
  console.log("====================");

  const email = await question("Enter admin email to update: ");
  const newRole = await question("Enter new role (Admin/SuperAdmin): ");

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin not found with this email");
      return;
    }

    const roleValue = newRole === "Admin" || newRole === "SuperAdmin" ? newRole : "Admin";
    admin.role = roleValue;
    await admin.save();
    console.log(`✅ Admin role updated to: ${roleValue}`);
  } catch (error) {
    console.error("❌ Error updating admin role:", error);
  }
};

const recreateAdmin = async () => {
  console.log("\n🔄 RECREATE ADMIN");
  console.log("=================");

  const email = await question("Enter admin email to recreate: ");
  const name = await question("Enter new admin name: ");
  const password = await question("Enter new admin password: ");
  const role = await question("Enter role (Admin/SuperAdmin): ");

  try {
    // Delete existing admin if exists
    await Admin.deleteOne({ email });
    console.log("🗑️ Existing admin deleted (if existed)");

    // Create new admin
    const admin = new Admin({
      email,
      name,
      password, // Let the model handle hashing
      role: role || "Admin",
    });

    await admin.save();
    console.log("✅ Admin recreated successfully");
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);
    console.log(`🔑 Role: ${role || "Admin"}`);
  } catch (error) {
    console.error("❌ Error recreating admin:", error);
  }
};

const deleteAdmin = async () => {
  console.log("\n🗑️ DELETE ADMIN");
  console.log("===============");

  const email = await question("Enter admin email to delete: ");
  const confirm = await question(
    `Are you sure you want to delete admin with email '${email}'? (yes/no): `
  );

  if (confirm.toLowerCase() !== "yes") {
    console.log("❌ Operation cancelled");
    return;
  }

  try {
    const result = await Admin.deleteOne({ email });
    if (result.deletedCount > 0) {
      console.log("✅ Admin deleted successfully");
    } else {
      console.log("❌ Admin not found with this email");
    }
  } catch (error) {
    console.error("❌ Error deleting admin:", error);
  }
};

const showMenu = async () => {
  console.log("\n🎛️  ADMIN MANAGER");
  console.log("================");
  console.log("1. Create new admin");
  console.log("2. List all admins");
  console.log("3. Update admin role");
  console.log("4. Recreate admin");
  console.log("5. Delete admin");
  console.log("6. Exit");

  const choice = await question("\nSelect an option (1-6): ");

  switch (choice) {
    case "1":
      await createAdmin();
      break;
    case "2":
      await listAdmins();
      break;
    case "3":
      await updateAdminRole();
      break;
    case "4":
      await recreateAdmin();
      break;
    case "5":
      await deleteAdmin();
      break;
    case "6":
      console.log("👋 Goodbye!");
      rl.close();
      process.exit(0);
    default:
      console.log("❌ Invalid option. Please try again.");
  }

  // Show menu again unless exiting
  await showMenu();
};

const main = async () => {
  console.log("🔧 Champion Site Admin Manager");
  console.log("==============================");

  await connectToDatabase();
  await showMenu();
};

// Handle cleanup
rl.on("close", () => {
  mongoose.disconnect();
  process.exit(0);
});

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  rl.close();
  process.exit(1);
});
