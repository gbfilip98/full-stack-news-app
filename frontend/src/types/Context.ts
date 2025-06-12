import type { ReactNode } from "react";
import { type IArticle } from "./Article";

export interface INewsProviderProps {
  children: ReactNode;
}

export type DisplayedNews = "all-news" | "regular-news" | "infinite-news";

export type Category =
  | "Home"
  | "Business"
  | "General"
  | "Health"
  | "Science"
  | "Sports"
  | "Technology"
  | "Favorites";

export interface IRegularNewsContextData {
  articles: IArticle[];
  totalArticles: number;
  category: Category;
  page: number;
  searchInput: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface IRegularNewsFetchData {
  setRegularNewsData: React.Dispatch<
    React.SetStateAction<IRegularNewsContextData>
  >;
  category: Category;
  searchInput: string;
  page: number;
}

export interface IInfiniteNewsContextData {
  articles: IArticle[];
  pageSize: number;
  isLoading?: boolean;
  error?: string | null;
}

export interface IInfiniteNewsFetchData {
  setInfiniteNewsData: React.Dispatch<
    React.SetStateAction<IInfiniteNewsContextData>
  >;
  pageSize: number;
}