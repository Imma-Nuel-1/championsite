import mongoose from "mongoose";

const liveStreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Sunday Service Live",
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    scheduledTime: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      default: "Join us for worship and the Word!",
    },
    thumbnail: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LiveStream", liveStreamSchema);
