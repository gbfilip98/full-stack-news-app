import { type Article } from "../types/Article";
import { ITEMS_PER_PAGE, useNewsContext } from "../context/NewsContext";
import { addBookmark, removeBookmark } from "../services/actions/userActions";
import { defineCategory } from "@/utils/defineCategory";
import Icon from "./Icon";
import { useMemo } from "react";
import { colors } from "@/data/constants";

interface Props {
  article: Article;
}

// const BreakingNewsCard = lazy(() => import('./BreakingNewsCard'));
// const NormalNewsCard = lazy(() => import('./NormalNewsCard'));

const RegularNewsCard: React.FunctionComponent<Props> = ({ article }) => {
  const { userData, regularNewsData, setUserData, setRegularNewsData } =
    useNewsContext();

  const isBookmarked = useMemo(() => {
    return userData?.bookmarks?.some((a) => a.url === article.url);
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
  }, [regularNewsData.category, article.url]);

  const isBreakingNews = useMemo(() => {
    return displayedCategory === "BREAKING";
  }, [displayedCategory]);

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
      setRegularNewsData((prev) => {
        let newPage = prev.page;
        let newArticles = prev.articles;
        let newTotalArticles = prev.totalArticles;

        let newBookmarks: Article[] = [];
        const text = prev.searchInput.trim().toLowerCase();
        if (!text) {
          newBookmarks = user.bookmarks;
        } else {
          newBookmarks = user.bookmarks?.filter(
            (a: Article) =>
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

          newArticles = newBookmarks?.slice(
            startingIndex,
            startingIndex + ITEMS_PER_PAGE
          ); // newBookmarks' array needs to be sliced because displayed data.firstSection.articles' length can't be longer than ITEMS_PER_PAGE
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

      if (typeof err === 'string') {
        console.error("Bookmark error:", err);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        console.error("Bookmark error:", (err as { message: string }).message);
      } else {
        console.error("Bookmark error:", 'Bookmark error: An unknown error occurred.');
      }

      // setData(prev => ({
      //   ...prev,
      //   sectionOne: {
      //     ...prev.sectionOne,
      //     error: err.message || "Bookmark error"
      //   }
      // }));
    }
  };

  // article.urlToImage?.replace(/\.(jpg|png)$/, '.webp')
  // if (displayedCategory === "BREAKING") {
  //   return (
  //     // <Suspense fallback={<div>Loading breaking news...</div>}>
  //       <BreakingNewsCard article={article} isBookmarked={isBookmarked} toggleBookmark={toggleBookmark}/>
  //     // </Suspense>
  //   );
  // }

  return (
    // <Suspense fallback={<div>Loading normal news...</div>}>
    <div className={"article-card" + (isBreakingNews ? " breaking-news" : "")}>
      <img
        src={article.urlToImage || "/images/default.png"}
        alt={article.title}
        height="140px"
        className="thumbnail"
      />
      <div className="article-info">
        {/* DODAT CATEGORY i LOGIKU ZA ODREDIT CATEGORY */}
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
          fill={isBookmarked ? colors.color_yellow_primary : colors.color_white_primary}
          stroke={colors.color_black_secondary}
          width="15"
          height="15"
          viewBox="0 0 20 20"
          alt={"Bookmark news article with title - " + "'" + article.title + "'"}
        />
      </button>
      {displayedCategory === "PROGRAMMATIC/NATIVE AD" ? (
        <div className="ad">AD</div>
      ) : (
        ""
      )}
    </div>
    // </Suspense>
  );
};

export default RegularNewsCard;
