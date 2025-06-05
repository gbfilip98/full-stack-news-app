import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
import { User } from '../types/User.js';
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

const UserSchema = new mongoose.Schema<User>({
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
  // bookmarks: { 
  //   type: [String],
  //   default: [] 
  // },
  bookmarks: [ArticleSchema],
});

export default mongoose.model<User>('User', UserSchema);

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
// });

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   bookmarks: [{
//     type: String
//   }]
// });

// // Hash password before save
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const User = mongoose.model('User', userSchema);
// export default User;