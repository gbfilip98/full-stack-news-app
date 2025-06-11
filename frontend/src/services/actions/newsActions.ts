import { getService } from '../api';
import { type NewsApiResponse } from '@/types/Article';

export const fetchArticles = async ({
  searchInput = "",
  page = 1,
  pageSize = 16,
  category = "Home"
}): Promise<NewsApiResponse> => {

  console.log("in",
    searchInput,
    page,
    pageSize,
    category
  )

  const token = localStorage.getItem("token");
  const url = `/news/articles?q=${searchInput}${category != "Home" ? "&category=" + category : ""}&pageSize=${pageSize}&page=${page}`;
  const response = await getService(url, token || "");

  console.log("out", response)

  return response;
};