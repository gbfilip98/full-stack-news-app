import { IArticle } from "./Article";
import { Document } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  bookmarks: IArticle[]; // bookmarked articles (favorites) by certain user
}

export interface IUserDocument extends IUser, Document {
  toObject(): Omit<IUser, "password"> & { password?: string };
}

export type UserSafeData = Omit<IUser, "password">;
