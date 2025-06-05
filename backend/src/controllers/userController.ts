import { Response } from 'express';
import { Article } from '../types/Article';
import { AuthRequest } from '../types/Auth';

export const getInfo = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const { password, ...userData } = user.toObject();
  res.json(userData);
};

export const addBookmark = async (req: AuthRequest, res: Response) => {
  const article = req.body;
  const user = req.user;

  // if (user.bookmarks.some((a: any) => a.url === article.url)) {
  //   res.status(400).json({ message: 'Already bookmarked' });
  // } else {
  user.bookmarks.push(article);
  await user.save();
  
  const { password: _, ...userData } = user.toObject();
  res.json(userData);
  // }
};

export const removeBookmark = async (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  const user = req.user;
  
  const decodedUrl = decodeURIComponent(url);
  user.bookmarks = user.bookmarks.filter((a: Article) => a.url !== decodedUrl);
  await user.save();

  const { password: _, ...userData } = user.toObject();
  res.json(userData);
};