import { Response } from "express";
import { IArticle } from "../types/Article";
import { IAuthRequest } from "../types/Auth";
import { UserSafeData } from "../types/User";

export const getInfo = async (req: IAuthRequest, res: Response) => {
  const user = req.user;

  const userData = user?.toObject() as { password: string } & UserSafeData;
  res.json(userData);
};

export const addBookmark = async (req: IAuthRequest, res: Response) => {
  const article = req.body;
  const user = req.user;

  user?.bookmarks.push(article);
  user?.bookmarks.sort(
    (a: IArticle, b: IArticle) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  await user?.save();

  const userData = user?.toObject() as { password: string } & UserSafeData;
  res.json(userData);
};

export const removeBookmark = async (req: IAuthRequest, res: Response) => {
  const { url } = req.body;
  const user = req.user;

  const decodedUrl = decodeURIComponent(url);
  user!.bookmarks = (user?.bookmarks || []).filter(
    (a: IArticle) => a.url !== decodedUrl
  );
  await user?.save();

  const userData = user?.toObject() as { password: string } & UserSafeData;
  res.json(userData);
};
