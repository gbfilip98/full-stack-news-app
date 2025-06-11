import { ITEMS_PER_PAGE, useNewsContext } from "../context/NewsContext";
// import { fetchArticles } from "../services/actions/newsActions";
import PaginationButton from "./PaginationButton";
import "../styles/components/Pagination.scss";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import { scrollToTop } from "@/utils/scrollToTop";

const Pagination: React.FunctionComponent = () => {
  const { userData, regularNewsData, setRegularNewsData } = useNewsContext();
  const startIndex = (regularNewsData.page - 1) * ITEMS_PER_PAGE;
  const prevPage = Math.max(1, regularNewsData.page - 1);
  const nextPage = regularNewsData.page + 1;

  const handlePaginationButtonClick = (newPage: number) => {
    scrollToTop();

    setRegularNewsData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    if (regularNewsData.category !== "Favorites") {
      fetchRegularNewsData({
        setRegularNewsData,
        category: regularNewsData.category,
        searchInput: regularNewsData.searchInput,
        page: newPage
      });

      // try {
      //   const response = await fetchArticles({
      //     page: newPage,
      //     category: regularNewsData.category,
      //     searchInput: regularNewsData.searchInput,
      //   });

      //   setRegularNewsData((prev) => ({
      //     ...prev,
      //     articles: response.articles,
      //     totalArticles: response.totalResults,
      //     page: newPage,
      //     isLoading: false,
      //     error: null,
      //   }));
      // } catch (error: any) {
      //   console.error("Error loading articles:", error.message);
      //   setRegularNewsData((prev) => ({
      //     ...prev,
      //     error: error.message || "Failed to load articles",
      //     isLoading: false,
      //   }));
      // }
    } else {
      const newIndex = (newPage - 1) * ITEMS_PER_PAGE;
      setRegularNewsData((prev) => ({
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

    // handlePaginationButtonClick(
    //   regularNewsData,
    //   setRegularNewsData,
    //   userData,
    //   newPage
    // );
  };
  // const handleNext = async () => {
  //   setRegularNewsData((prev) => ({
  //     ...prev,
  //     isLoading: true
  //   }));
  //   const nextPage: number = regularNewsData.page + 1;

  //   if (regularNewsData.category !== "Favorites") {
  //     try {
  //       const response = await fetchArticles({
  //         page: nextPage,
  //         category: regularNewsData.category,
  //         searchInput: regularNewsData.searchInput,
  //       });

  //       setRegularNewsData((prev) => ({
  //         ...prev,
  //         articles: response.articles,
  //         totalArticles: response.totalResults,
  //         page: nextPage,
  //         isLoading: false,
  //         error: null
  //       }));
  //     } catch (error: any) {
  //       console.error("Error loading articles:", error.message);
  //       setRegularNewsData((prev) => ({
  //         ...prev,
  //         error: error.message || "Failed to load articles",
  //         isLoading: false
  //       }));
  //     }
  //   } else {
  //     const newIndex = (nextPage - 1) * ITEMS_PER_PAGE;
  //     setRegularNewsData((prev) => ({
  //       ...prev,
  //       articles: userData!.bookmarks?.slice(
  //         newIndex,
  //         newIndex + ITEMS_PER_PAGE
  //       ),
  //       totalArticles: userData!.bookmarks?.length,
  //       page: nextPage,
  //       isLoading: false,
  //       error: null
  //     }));
  //   }
  // };

  // const handlePrev = async () => {
  //   setRegularNewsData((prev) => ({
  //     ...prev,
  //     isLoading: true
  //   }));
  //   const prevPage: number = Math.max(1, regularNewsData.page - 1);

  //   if (regularNewsData.category !== "Favorites") {
  //     try {
  //       const response = await fetchArticles({
  //         page: prevPage,
  //         category: regularNewsData.category,
  //         searchInput: regularNewsData.searchInput,
  //       });

  //       setRegularNewsData((prev) => ({
  //         ...prev,
  //         articles: response.articles,
  //         totalArticles: response.totalResults,
  //         page: prevPage,
  //         isLoading: false,
  //         error: null
  //       }));
  //     } catch (error: any) {
  //       console.error("Error loading articles:", error.message);
  //       setRegularNewsData((prev) => ({
  //         ...prev,
  //         error: error.message || "Failed to load articles",
  //         isLoading: false
  //       }));
  //     }
  //   } else {
  //     const newIndex = (prevPage - 1) * ITEMS_PER_PAGE;
  //     setRegularNewsData((prev) => ({
  //       ...prev,
  //       articles: userData!.bookmarks.slice(
  //         newIndex,
  //         newIndex + ITEMS_PER_PAGE
  //       ),
  //       totalArticles: userData!.bookmarks?.length,
  //       page: prevPage,
  //       isLoading: false,
  //       error: null
  //     }));
  //   }
  // };

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
