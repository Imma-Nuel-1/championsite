import mongoose, { Document, Schema } from 'mongoose';

export interface ISermon extends Document {
  title: string;
  preacher: string;
  date: Date;
  description?: string;
  mediaUrl?: string; // audio or video URL (Cloudinary or YouTube)
}

const SermonSchema = new Schema<ISermon>(
  {
    title: { type: String, required: true },
    preacher: { type: String, required: true },
    date: { type: Date, required: true },
    description: String,
    mediaUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model<ISermon>('Sermon', SermonSchema);
