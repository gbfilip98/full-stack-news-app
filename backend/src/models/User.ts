import mongoose from 'mongoose';
import { UserDocument } from '../types/User.js';
import { Article } from '../types/Article';

const ArticleSchema = new mongoose.Schema<Article>({
  source: {
    id: { type: String, default: null },
    name: String,
  },
  author: { type: String, default: null },
  title: String,
  description: { type: String, default: null },
  url: String,
  urlToImage: { type: String, default: null },
  publishedAt: String,
  content: { type: String, default: null },
  category: { type: String, default: null },
});

const UserSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  bookmarks: [ArticleSchema],
});

export default mongoose.model<UserDocument>('User', UserSchema);