import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db";
import env from "./config/env";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import sermonRoutes from "./routes/sermons";
import eventRoutes from "./routes/events";
import galleryRoutes from "./routes/galleryRoutes";
import blogRoutes from "./routes/blogRoutes";
import prayerRequestRoutes from "./routes/prayerRequestRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import liveStreamRoutes from "./routes/liveStreamRoutes";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    connectDB();
    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    if (env.NODE_ENV !== "test") this.app.use(morgan("dev"));

    this.app.get("/health", (_req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });
  }

  private routes() {
    this.app.use("/api/admin", adminRoutes);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/sermons", sermonRoutes);
    this.app.use("/api/events", eventRoutes);
    this.app.use("/api/gallery", galleryRoutes);
    this.app.use("/api/blog", blogRoutes);
    this.app.use("/api/prayer-request", prayerRequestRoutes);
    this.app.use("/api/testimonials", testimonialRoutes);
    this.app.use("/api/livestream", liveStreamRoutes);
  }

  private errorHandling() {
    this.app.use(errorHandler);
  }
}
