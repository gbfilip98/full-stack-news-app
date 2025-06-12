import { fetchArticles } from "@/services/actions/newsActions";
import type {
  IInfiniteNewsFetchData,
  IRegularNewsFetchData,
} from "@/types/Context";

export const fetchRegularNewsData = async ({
  setRegularNewsData,
  category,
  searchInput,
  page,
}: IRegularNewsFetchData) => {
  try {
    const response = await fetchArticles({
      category: category,
      searchInput: searchInput.trim(),
      page: page,
    });

    setRegularNewsData((prev) => ({
      ...prev,
      articles: response.articles,
      totalArticles: response.totalResults,
      page: page,
      isLoading: false,
      error: null,
    }));
  } catch (err: unknown) {
    let errorMessage = "";
    if (typeof err === "string") {
      errorMessage = err;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = (err as { message: string }).message;
    } else {
      errorMessage = "Failed to load articles: an unknown error occurred.";
    }

    setRegularNewsData((prev) => ({
      ...prev,
      error: errorMessage,
      isLoading: false,
    }));
  }
};

export const fetchInfiniteNewsData = async ({
  setInfiniteNewsData,
  pageSize,
}: IInfiniteNewsFetchData) => {
  try {
    const response = await fetchArticles({
      pageSize: pageSize,
    });

    setInfiniteNewsData({
      articles: response.articles || [],
      pageSize: pageSize || 10,
      isLoading: false,
      error: null,
    });
  } catch (err: unknown) {
    let errorMessage = "";
    if (typeof err === "string") {
      errorMessage = err;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMessage = (err as { message: string }).message;
    } else {
      errorMessage = "Failed to load articles: an unknown error occurred.";
    }

    setInfiniteNewsData((prev) => ({
      ...prev,
      error: errorMessage,
      isLoading: false,
    }));
  }
};
