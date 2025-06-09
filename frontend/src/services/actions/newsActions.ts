import { getService } from '../api';
import { type NewsApiResponse } from '@/types/NewsApiResponse';

// export const login = async (payload: {
//   email: string;
//   password: string;
// }) => {
//   const response = await post('/auth/login', payload);
//   const { token, user } = response.data;
//   localStorage.setItem('token', token);
//   return user as User;
// };

export const fetchArticles = async ({
  searchInput = "a",
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