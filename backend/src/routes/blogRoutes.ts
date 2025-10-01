import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogPostController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);

// Protected routes for admin
router.post('/', requireAuth, createBlogPost);
router.put('/:slug', requireAuth, updateBlogPost);
router.delete('/:slug', requireAuth, deleteBlogPost);

export default router;
