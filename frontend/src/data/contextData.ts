import type { IInfiniteNewsContextData, IRegularNewsContextData } from "@/types/Context";

export const defaultRegularNewsContextData: IRegularNewsContextData = {
  articles: [],
  totalArticles: 0,
  category: "Home",
  page: 1,
  searchInput: "",
  isLoading: true,
  error: null,
};

export const defaultInfiniteNewsContextData: IInfiniteNewsContextData = {
  articles: [],
  pageSize: 10,
  isLoading: true,
  error: null,
};