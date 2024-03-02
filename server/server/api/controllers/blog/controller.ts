import { Request, Response } from 'express';
import BlogService from '../../services/blog.service';

export class BlogController {
  async getAllBlogs(_: Request, res: Response): Promise<void> {
    try {
      const blogs = await BlogService.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params['id'];
      const blog = await BlogService.getBlogById(id);
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const createdBlog = await BlogService.createBlog(req.body);
      res
        .status(201)
        .location(`/api/blogs/${createdBlog.id}`)
        .json(createdBlog);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const blogId = req.params['blogId'];
      const posts = await BlogService.getAllPosts(blogId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params['id'];
      const updatedBlog = await BlogService.updateBlog(id, req.body);
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params['id'];
      await BlogService.deleteBlog(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const blogId = req.params['blogId'];
      const postId = req.params['postId'];
      const updatedPost = await BlogService.updatePost(
        blogId,
        postId,
        req.body
      );
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const blogId = req.params['blogId'];
      const postId = req.params['postId'];
      await BlogService.deletePost(blogId, postId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new BlogController();
