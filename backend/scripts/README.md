# Admin Manager Documentation

## Overview

The `adminManager.ts` script is a consolidated tool for managing admin users in the Champion Site application. It replaces multiple individual scripts with a single, interactive interface.

## Features

- ✅ Create new admin users
- 📋 List all existing admins
- 🔄 Update admin roles
- 🔄 Recreate admin accounts
- 🗑️ Delete admin users
- 🔐 Interactive password input
- ✨ Input validation and confirmation

## Usage

### Running the Admin Manager

```bash
cd backend
npm run admin
```

### Menu Options

1. **Create new admin** - Add a new admin user with email, name, password, and role
2. **List all admins** - Display all existing admin users (excluding passwords)
3. **Update admin role** - Change an existing admin's role between Admin/SuperAdmin
4. **Recreate admin** - Delete and recreate an admin account with new credentials
5. **Delete admin** - Remove an admin user (with confirmation)
6. **Exit** - Close the admin manager

### Security Features

- No hardcoded credentials (prompts for input)
- Password hashing handled automatically by the Admin model
- Confirmation required for destructive operations
- Secure password input (though visible in terminal)

### Roles

- **Admin**: Standard administrative access
- **SuperAdmin**: Enhanced administrative privileges

## Migration from Old Scripts

The following scripts have been consolidated into `adminManager.ts`:

- ❌ `createAdmin.ts` (removed)
- ❌ `listAdmins.ts` (removed)
- ❌ `recreateAdmin.ts` (removed)
- ❌ `updateAdminRole.ts` (removed)
- ❌ `createFirstAdmin.ts` (removed)

## Error Handling

- Database connection validation
- Duplicate email prevention
- Graceful error messages
- Automatic cleanup on exit

## Example Session

```
🔧 Champion Site Admin Manager
==============================
✅ Connected to MongoDB

🎛️  ADMIN MANAGER
================
1. Create new admin
2. List all admins
3. Update admin role
4. Recreate admin
5. Delete admin
6. Exit

Select an option (1-6): 1

🔧 CREATE NEW ADMIN
==================
Enter admin email: admin@championsite.com
Enter admin name: Site Administrator
Enter admin password: [secure password]
Enter role (Admin/SuperAdmin): Admin

✅ Admin user created successfully
📧 Email: admin@championsite.com
👤 Name: Site Administrator
🔑 Role: Admin
```

## Prerequisites

- MongoDB connection configured in `.env`
- TypeScript and ts-node installed
- Backend dependencies installed (`npm install`)

## Environment Variables

Ensure your `.env` file contains:

```
MONGO_URI=mongodb://localhost:27017/championsite
```
