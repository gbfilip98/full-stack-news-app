import { getService, patchService } from '../api';
import { type Article } from '../../types/Article';
import type { User } from '../../types/User';

export const addBookmark = async (article: Article, token: string): Promise<User> => {
  const response = await patchService('/user/bookmark/add', article, token);
  return response;
};

export const removeBookmark = async (url: string, token: string): Promise<User> => {
  const response = await patchService(`/user/bookmark/remove`, { url: encodeURIComponent(url) }, token);
  return response;
};

export const fetchUserData = async (token: string): Promise<User> => {
  const response = await getService('/user/data', token);
  return response;
};