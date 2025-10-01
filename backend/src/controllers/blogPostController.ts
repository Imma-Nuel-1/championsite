import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';

// ✅ Get all blog posts with pagination
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await BlogPost.countDocuments();

    return res.json({
      success: true,
      data: posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to fetch blog posts' });
  }
};

// ✅ Get a single blog post by slug
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching blog post' });
  }
};

// ✅ Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, author, tags, featuredImage } = req.body;

    const newPost: IBlogPost = new BlogPost({
      title,
      content,
      author,
      tags,
      featuredImage,
    });

    await newPost.save();

    return res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Error creating blog post' });
  }
};

// ✅ Update a blog post
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const updatedPost = await BlogPost.findOneAndUpdate({ slug }, req.body, { new: true, runValidators: true });

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    return res.json({ success: true, data: updatedPost });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error updating blog post' });
  }
};

// ✅ Delete a blog post
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const deletedPost = await BlogPost.findOneAndDelete({ slug });

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    return res.json({ success: true, message: 'Blog post deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error deleting blog post' });
  }
};
