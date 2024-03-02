import express from 'express';
import controller from './controller';

const router = express.Router();

// Define routes for creating, getting all blogs, getting a blog by ID, updating, and deleting blogs
router.post('/', controller.createBlog);
router.get('/', controller.getAllBlogs);
router.get('/:id', controller.getBlogById);
router.patch('/:id', controller.updateBlog); // Using PATCH method for partial updates
router.delete('/:id', controller.deleteBlog); // Assuming the ID is passed in the URL

// Define routes for getting all posts of a specific blog
router.get('/:blogId/posts', controller.getAllPosts);

// Define routes for updating and deleting posts
router.patch('/:blogId/posts/:postId', controller.updatePost); // Using PATCH method for partial updates
router.delete('/:blogId/posts/:postId', controller.deletePost); // Assuming the post ID is passed in the URL

export default {
  createBlog: router.post.bind(router, '/'),
  getAllBlogs: router.get.bind(router, '/'),
  getBlogById: router.get.bind(router, '/:id'),
  updateBlog: router.patch.bind(router, '/:id'),
  deleteBlog: router.delete.bind(router, '/:id'),
  getAllPosts: router.get.bind(router, '/:blogId/posts'),
  updatePost: router.patch.bind(router, '/:blogId/posts/:postId'),
  deletePost: router.delete.bind(router, '/:blogId/posts/:postId'),
};
