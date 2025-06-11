import { Response } from 'express';
import { Article } from '../types/Article';
import { AuthRequest } from '../types/Auth';
import { UserSafeData } from '../types/User';

export const getInfo = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  // const userData = user.toObject() as Partial<typeof user> & { [key: string]: any };
  // delete userData.password;
  // const { password, ...userData }: { password: string; } & UserSafeData = user.toObject();
  const userData = user.toObject() as { password: string; } & UserSafeData;
  res.json(userData);
};

export const addBookmark = async (req: AuthRequest, res: Response) => {
  const article = req.body;
  const user = req.user;

  // if (user.bookmarks.some((a: any) => a.url === article.url)) {
  //   res.status(400).json({ message: 'Already bookmarked' });
  // } else {
  user.bookmarks.push(article);
  user.bookmarks.sort((a: Article, b: Article) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  await user.save();
  
  // const userData = user.toObject() as Partial<typeof user> & { [key: string]: any };
  // delete userData.password;
  // const { password, ...userData }: { password: string; } & UserSafeData = user.toObject();
  const userData = user.toObject() as { password: string; } & UserSafeData;
  res.json(userData);
  // }
};

export const removeBookmark = async (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  const user = req.user;
  
  const decodedUrl = decodeURIComponent(url);
  user.bookmarks = user.bookmarks.filter((a: Article) => a.url !== decodedUrl);
  await user.save();

  // const userData = user.toObject() as Partial<typeof user> & { [key: string]: any };
  // delete userData.password;
  // const { password, ...userData }: { password: string; } & UserSafeData = user.toObject();
  const userData = user.toObject() as { password: string; } & UserSafeData;
  res.json(userData);
};