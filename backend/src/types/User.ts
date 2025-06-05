import { Article } from "./Article";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  bookmarks: Article[]; // article URLs
}