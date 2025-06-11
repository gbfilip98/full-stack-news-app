import { Article } from "./Article";
import { Document } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  bookmarks: Article[]; // article URLs
}

export interface UserDocument extends User, Document {
  toObject(): Omit<User, 'password'> & { password?: string };
}

export type UserSafeData = Omit<User, 'password'>;