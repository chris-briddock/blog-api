// models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
  userId: string;
  blogId: string; // Assuming each post belongs to a specific blog
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
});

export default mongoose.model<Post>('Post', PostSchema);
