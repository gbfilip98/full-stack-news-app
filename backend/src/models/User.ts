import mongoose from "mongoose";
import { IUserDocument } from "../types/User.js";
import { IArticle } from "../types/Article";

const ArticleSchema = new mongoose.Schema<IArticle>({
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

const UserSchema = new mongoose.Schema<IUserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  bookmarks: [ArticleSchema],
});

export default mongoose.model<IUserDocument>("User", UserSchema);
