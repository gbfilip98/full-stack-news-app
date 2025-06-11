// import { fetchArticles } from "@/services/actions/newsActions";
import type {
  Category,
  InfiniteNewsContextData,
  RegularNewsContextData,
} from "@/types/Context";
import dummyArticles from "../data/dummyArticles.json"

interface RegularNewsData {
  setRegularNewsData: React.Dispatch<
    React.SetStateAction<RegularNewsContextData>
  >;
  category: Category;
  searchInput: string;
  page: number;
}

interface InfiniteNewsData {
  setInfiniteNewsData: React.Dispatch<
    React.SetStateAction<InfiniteNewsContextData>
  >;
  pageSize: number;
}

export const fetchRegularNewsData = async ({
  setRegularNewsData,
  // category,
  // searchInput,
  page,
}: RegularNewsData) => {
  try {
    // const response = await fetchArticles({
    //   category: category,
    //   searchInput: searchInput.trim(),
    //   page: page,
    // });

    const response = {articles: dummyArticles, totalResults: 10};

    setRegularNewsData((prev) => ({
      ...prev,
      articles: response.articles,
      totalArticles: response.totalResults,
      page: page,
      isLoading: false,
      error: null,
    }));
  } catch (err: unknown) {
    let errorMessage = ""
    if (typeof err === 'string') {
      errorMessage = err;
    } else if (typeof err === 'object' && err !== null && 'message' in err) {
      errorMessage = (err as { message: string }).message;
    } else {
      errorMessage = 'Failed to load articles: an unknown error occurred.';
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
}: InfiniteNewsData) => {
  try {
    // const response = await fetchArticles({
    //   pageSize: pageSize,
    // });

    const response = {articles: dummyArticles};

    console.log("IN IN")

    setInfiniteNewsData({
      articles: response.articles || [],
      pageSize: pageSize || 10,
      isLoading: false,
      error: null,
    });
  } catch (err: unknown) {
    let errorMessage = ""
    if (typeof err === 'string') {
      errorMessage = err;
    } else if (typeof err === 'object' && err !== null && 'message' in err) {
      errorMessage = (err as { message: string }).message;
    } else {
      errorMessage = 'Failed to load articles: an unknown error occurred.';
    }

    setInfiniteNewsData((prev) => ({
      ...prev,
      error: errorMessage,
      isLoading: false,
    }));
  }
};