import mongoose from 'mongoose';
import BlogModel from '../models/Blog';
import PostModel from '../models/Post';
import { BlogData } from '../interfaces/BlogData';
import { PostData } from '../interfaces/PostData';
import l from '../../common/logger';

const mongoUri: string =
  process.env.MONGODB_URI || 'mongodb://root:pass12345@mongodb:27017/blog';

mongoose
  .connect(mongoUri)
  .then(() => {
    l.info('Connected to MongoDB');
  })
  .catch((error) => {
    l.error('Error connecting to MongoDB:', error);
  });

class BlogService {
  async getAllBlogs() {
    try {
      const blogs = await BlogModel.find();
      return blogs;
    } catch (error) {
      throw new Error('Failed to fetch blogs');
    }
  }

  async getBlogById(id: string) {
    try {
      const blog = await BlogModel.findById(id);
      return blog;
    } catch (error) {
      throw new Error('Failed to fetch blog');
    }
  }

  async createBlog(blogData: BlogData) {
    try {
      const createdBlog = await BlogModel.create(blogData);
      return createdBlog;
    } catch (error) {
      throw new Error('Failed to create blog');
    }
  }

  async updateBlog(id: string, blogData: BlogData) {
    try {
      const updatedBlog = await BlogModel.findByIdAndUpdate(id, blogData, {
        new: true,
      });
      return updatedBlog;
    } catch (error) {
      throw new Error('Failed to update blog');
    }
  }

  async deleteBlog(id: string) {
    try {
      await BlogModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Failed to delete blog');
    }
  }

  async getAllPosts(blogId: string) {
    try {
      const posts = await PostModel.find({ blogId });
      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  }

  async updatePost(blogId: string, postId: string, postData: PostData) {
    try {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, blogId },
        postData,
        { new: true }
      );
      return updatedPost;
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  async deletePost(blogId: string, postId: string) {
    try {
      await PostModel.findOneAndDelete({ _id: postId, blogId });
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }
}

export default new BlogService();
