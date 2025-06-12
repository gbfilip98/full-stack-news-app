import { useNewsContext } from "../context/NewsContext";
import PaginationButton from "./PaginationButton";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import { scrollToTop } from "@/utils/scrollToTop";
import type { IRegularNewsContextData } from "@/types/Context";
import { useMemo } from "react";
import { ITEMS_PER_PAGE } from "@/data/commonData";
import "../styles/components/Pagination.scss";

const Pagination: React.FunctionComponent = () => {
  const { userData, regularNewsData, setRegularNewsData } = useNewsContext();
  const startIndex = useMemo(() => {
    return (regularNewsData.page - 1) * ITEMS_PER_PAGE;
  }, [regularNewsData.page]);
  const prevPage = useMemo(() => {
    return Math.max(1, regularNewsData.page - 1);
  }, [regularNewsData.page]);
  const nextPage = useMemo(() => {
    return regularNewsData.page + 1;
  }, [regularNewsData.page]);

  const handlePaginationButtonClick = (newPage: number) => {
    scrollToTop();

    setRegularNewsData((prev: IRegularNewsContextData) => ({
      ...prev,
      isLoading: true,
    }));

    if (regularNewsData.category !== "Favorites") {
      fetchRegularNewsData({
        setRegularNewsData,
        category: regularNewsData.category,
        searchInput: regularNewsData.searchInput,
        page: newPage,
      });
    } else {
      const newIndex = (newPage - 1) * ITEMS_PER_PAGE;
      setRegularNewsData((prev: IRegularNewsContextData) => ({
        ...prev,
        articles: userData!.bookmarks?.slice(
          newIndex,
          newIndex + ITEMS_PER_PAGE
        ),
        totalArticles: userData!.bookmarks?.length,
        page: newPage,
        isLoading: false,
        error: null,
      }));
    }
  };

  return (
    <div className="pagination-controls">
      <PaginationButton
        handleClick={() => {
          handlePaginationButtonClick(prevPage);
        }}
        icon={{ name: "arrow", rotate: 180 }}
        disabled={regularNewsData.page === 1}
      />
      <span>Page {regularNewsData.page}</span>
      <PaginationButton
        handleClick={() => {
          handlePaginationButtonClick(nextPage);
        }}
        icon={{ name: "arrow", rotate: 0 }}
        disabled={startIndex + ITEMS_PER_PAGE >= regularNewsData.totalArticles}
      />
    </div>
  );
};

export default Pagination;
