import { type IArticle, type ISingleArticle } from "../types/Article";
import { useNewsContext } from "../context/NewsContext";
import { addBookmark, removeBookmark } from "../services/actions/userActions";
import { defineCategory } from "@/utils/defineCategory";
import Icon from "./Icon";
import { useMemo } from "react";
import type { IRegularNewsContextData } from "@/types/Context";
import { colors, ITEMS_PER_PAGE } from "@/data/commonData";

const RegularNewsCard: React.FunctionComponent<ISingleArticle> = ({
  article,
}) => {
  const { userData, regularNewsData, setUserData, setRegularNewsData } =
    useNewsContext();

  const isBookmarked = useMemo(() => {
    return userData?.bookmarks?.some((a: IArticle) => a.url === article.url);
  }, [userData?.bookmarks, article.url]);

  // Relative category - which can be sent to NewsAPI for articles filtering
  const relativeCategoryOpened = useMemo(() => {
    return !["Home", "Favorites"].includes(regularNewsData.category);
  }, [regularNewsData.category]);

  const displayedCategory = useMemo(() => {
    if (article.category) return article.category.toUpperCase();
    if (regularNewsData.category && relativeCategoryOpened) {
      return regularNewsData.category.toUpperCase();
    } else {
      return defineCategory(article.title.toLowerCase());
    }
  }, [regularNewsData.category, article.url, relativeCategoryOpened]);

  const isBreakingNews = useMemo(() => {
    return displayedCategory === "BREAKING";
  }, [
    displayedCategory,
    regularNewsData.category,
    article.url,
    relativeCategoryOpened,
  ]);

  const toggleBookmark = async () => {
    const token = localStorage.getItem("token") || "";
    if (!userData || !token) return;

    try {
      const user = isBookmarked
        ? await removeBookmark(article.url, token)
        : await addBookmark(
            relativeCategoryOpened
              ? { ...article, category: regularNewsData.category }
              : article,
            token
          );

      localStorage.setItem("user", JSON.stringify(user));

      setUserData(user);
      setRegularNewsData((prev: IRegularNewsContextData) => {
        let newPage = prev.page;
        let newArticles = prev.articles;
        let newTotalArticles = prev.totalArticles;

        let newBookmarks: IArticle[] = [];
        const text = prev.searchInput.trim().toLowerCase();
        if (!text) {
          newBookmarks = user.bookmarks;
        } else {
          newBookmarks = user.bookmarks?.filter(
            (a: IArticle) =>
              a.title.toLowerCase().includes(text) ||
              a.description?.toLowerCase().includes(text) ||
              false
          );
        }

        if (prev.category === "Favorites") {
          let startingIndex = (prev.page - 1) * ITEMS_PER_PAGE; // this represents the index of the first displayed article

          const noBookmarks =
            prev.page > 1 && newBookmarks?.length - startingIndex < 1;
          // when user is viewing "Favorites", located on the page>1
          // and he is unbookmarking articles until the length of bookmarks displayed on that page isn't zero
          // when user unbookmarks all bookmarks from that page then the display is updated to show the previous page with bookmarks from the previous page
          if (noBookmarks) {
            startingIndex = startingIndex - ITEMS_PER_PAGE;
            newPage--;
          }

          // newBookmarks' array needs to be sliced
          // because displayed data.firstSection.articles' length cannot be longer than ITEMS_PER_PAGE
          newArticles = newBookmarks?.slice(
            startingIndex,
            startingIndex + ITEMS_PER_PAGE
          );
          newTotalArticles = newBookmarks?.length;
        }

        return {
          ...prev,
          articles: newArticles,
          totalArticles: newTotalArticles,
          page: newPage,
        };
      });
    } catch (err: unknown) {
      let errorMessage = "";

      if (typeof err === "string") {
        errorMessage = "Bookmark error:" + err;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = "Bookmark error:" + (err as { message: string }).message;
      } else {
        errorMessage = "Bookmark error: An unknown error occurred.";
      }

      setRegularNewsData((prev: IRegularNewsContextData) => ({
        ...prev,
        error: errorMessage,
      }));
    }
  };

  return (
    <div className={"article-card" + (isBreakingNews ? " breaking-news" : "")}>
      <img
        src={article.urlToImage || "/images/default.png"}
        alt={article.title}
        height="140px"
        className="thumbnail"
      />
      <div className="article-info">
        {isBreakingNews ? <div className="alert">BREAKING</div> : ""}
        <span>{displayedCategory}</span>
        <h3>{article.title}</h3>
        <p>{article.author}</p>
      </div>
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        onClick={toggleBookmark}
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        <Icon
          name="star"
          fill={
            isBookmarked
              ? colors.color_yellow_primary
              : colors.color_white_primary
          }
          stroke={colors.color_black_secondary}
          width={isBreakingNews ? "22" : "18"}
          height={isBreakingNews ? "22" : "18"}
          viewBox={isBreakingNews ? "3 5 20 20" : "0 0 20 24"}
          alt={
            "Bookmark news article with title - " + "'" + article.title + "'"
          }
        />
      </button>
      {displayedCategory === "PROGRAMMATIC/NATIVE AD" ? (
        <div className="ad">AD</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RegularNewsCard;
