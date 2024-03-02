import mongoose, { Document, Schema } from 'mongoose';

export interface Blog extends Document {
  title: string;
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
});

export default mongoose.model<Blog>('Blog', BlogSchema);
