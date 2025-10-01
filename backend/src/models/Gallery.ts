import mongoose, { Document, Schema, Model } from "mongoose";

export interface IGalleryFolder extends Document {
  title: string;
  description?: string;
  category?: string;
  previewImageUrl: string;
  images: string[];
  createdAt: Date;
}

const GallerySchema: Schema<IGalleryFolder> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, default: "General", trim: true },
    previewImageUrl: { type: String, required: true },
    images: {
      type: [String],
      required: true,
      validate: [
        (val: string[]) => val.length > 0,
        "At least one image is required",
      ],
    },
  },
  { timestamps: true }
);

GallerySchema.index({ category: 1, createdAt: -1 });

const Gallery: Model<IGalleryFolder> = mongoose.model<IGalleryFolder>(
  "Gallery",
  GallerySchema
);
export default Gallery;
