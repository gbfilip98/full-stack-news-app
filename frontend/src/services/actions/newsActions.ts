import { ITEMS_PER_PAGE } from "@/data/commonData";
import { getService } from "../api";
import { type INewsApiResponse } from "@/types/Article";

export const fetchArticles = async ({
  searchInput = "",
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  category = "Home",
}): Promise<INewsApiResponse> => {
  const token = localStorage.getItem("token");
  const url = `/news/articles?q=${searchInput}${category != "Home" ? "&category=" + category : ""}&pageSize=${pageSize}&page=${page}`;
  const response = await getService(url, token || "");

  return response;
};
