import { type IArticle } from "./Article";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  bookmarks: IArticle[]; // bookmarked articles (favorites) by certain user
}

export interface IUrl {
  url: string;
}
