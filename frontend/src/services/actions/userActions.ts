import { getService, patchService } from "../api";
import { type IArticle } from "@/types/Article";
import { type IUser } from "@/types/User";

export const addBookmark = async (
  article: IArticle,
  token: string
): Promise<IUser> => {
  const response = await patchService("/user/bookmark/add", article, token);
  return response;
};

export const removeBookmark = async (
  url: string,
  token: string
): Promise<IUser> => {
  const response = await patchService(
    `/user/bookmark/remove`,
    { url: encodeURIComponent(url) },
    token
  );
  return response;
};

export const fetchUserData = async (token: string): Promise<IUser> => {
  const response = await getService("/user/data", token);
  return response;
};
