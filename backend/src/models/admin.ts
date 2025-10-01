import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { logger } from '../utils/logger';

// Interface for Admin document
interface IAdminBase {
  email: string;
  name: string;
  password: string;
  role: 'Admin' | 'SuperAdmin';
  isActive: boolean;
  lastLogin?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

// Document interface (includes Mongoose document methods)
export interface IAdminDocument extends IAdminBase, Document {
  _id: mongoose.Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
  toSafeObject(): Omit<IAdminDocument, 'password' | 'passwordResetToken' | 'passwordResetExpires' | 'comparePassword' | 'changedPasswordAfter' | 'createPasswordResetToken'>;
}

// Static methods interface
interface IAdminModel extends Model<IAdminDocument> {
  // Add any static methods here
}

const AdminSchema = new Schema<IAdminDocument, IAdminModel>(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot be longer than 50 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['Admin', 'SuperAdmin'],
      default: 'Admin',
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
AdminSchema.index({ isActive: 1 });

// Middleware to hash password before saving
AdminSchema.pre<IAdminDocument>('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  try {
    // Hash the password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this["password"] = await bcrypt.hash(this.password, salt);
    
    // Set passwordChangedAt if not a new user
    if (!this.isNew) {
      this.passwordChangedAt = new Date(Date.now() - 1000);
    }
    
    next();
  } catch (error) {
    logger.error('Error hashing password:', error);
    next(error as Error);
  }
});

// Instance method to compare passwords
AdminSchema.methods["comparePassword"] = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this["password"]);
  } catch (error) {
    logger.error('Error comparing passwords:', error);
    return false;
  }
};

// Check if password was changed after token was issued
AdminSchema.methods["changedPasswordAfter"] = function(JWTTimestamp: number): boolean {
  if (this["passwordChangedAt"]) {
    const changedTimestamp = Math.floor(this["passwordChangedAt"].getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create password reset token
AdminSchema.methods["createPasswordResetToken"] = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this["passwordResetToken"] = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this["passwordResetExpires"] = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to convert document to safe object (exclude sensitive data)
AdminSchema.methods["toSafeObject"] = function() {
  const admin = this["toObject"]();
  
  // Remove sensitive data
  delete admin.password;
  delete admin.passwordResetToken;
  delete admin.passwordResetExpires;
  
  return admin;
};

// Query middleware to filter out inactive admins by default
AdminSchema.pre(/^find/, function(this: any, next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const Admin = mongoose.model<IAdminDocument, IAdminModel>('Admin', AdminSchema);

export default Admin;
