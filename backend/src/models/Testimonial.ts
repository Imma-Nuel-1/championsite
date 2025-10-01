import { Schema, model, Document } from "mongoose";

export enum TestimonialStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface ITestimonial extends Document {
  name: string;
  title: string;
  message: string;
  status: TestimonialStatus;
  approved: boolean; // Keep for backward compatibility
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(TestimonialStatus),
    default: TestimonialStatus.PENDING,
  },
  approved: { type: Boolean, default: false }, // Keep for backward compatibility
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the approved field based on status for backward compatibility
TestimonialSchema.pre("save", function () {
  this.approved = this.status === TestimonialStatus.APPROVED;
  this.updatedAt = new Date();
});

export const Testimonial = model<ITestimonial>(
  "Testimonial",
  TestimonialSchema
);
