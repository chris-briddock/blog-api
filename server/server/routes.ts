import { Application } from 'express';
import router from './api/controllers/blog/router';

export default function routes(app: Application): void {
  app.get('/api/blogs', router.getAllBlogs);
  app.post('/api/blogs', router.createBlog);
  app.get('/api/blogs/:blogId', router.getBlogById);
  app.put('/api/blogs/:blogId', router.updateBlog);
  app.delete('/api/blogs/:blogId', router.deleteBlog);

  app.get('/api/blogs/:blogId/posts', router.getAllPosts);
  app.put('api/blogs/:blogId/posts/:postId', router.updatePost);
  app.delete('api/blogs/:blogId/posts/:postId', router.deletePost);
}
