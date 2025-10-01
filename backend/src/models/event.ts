import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  location: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  status: "upcoming" | "today" | "ongoing" | "completed";
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    imageUrl: String,
    category: String,
    status: {
      type: String,
      enum: ["upcoming", "today", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", EventSchema);
