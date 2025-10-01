import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for Blog Post document
export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string; // Later, this could be a reference to a User/Admin model
  tags?: string[];
  featuredImage?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Post Schema
const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A title is required for the blog post.'],
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required for the blog post.'],
    },
    author: {
      type: String,
      required: [true, 'An author is required.'],
      default: 'Admin',
    },
    tags: {
      type: [String],
      trim: true,
    },
    featuredImage: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Middleware to create a slug from the title before saving
BlogPostSchema.pre<IBlogPost>('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // remove non-word chars
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/--+/g, '-'); // remove consecutive hyphens
  }
  next();
});

// Indexing for faster queries
BlogPostSchema.index({ tags: 1 });

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
