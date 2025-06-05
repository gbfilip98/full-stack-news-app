import { type Article } from './Article';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  // password?: string;
  isVerified: boolean;
  bookmarks: Article[]; // bookmarked articles
}