import { type Article } from "../types/Article";
import { ITEMS_PER_PAGE, useNewsContext } from "../context/NewsContext";
import { addBookmark, removeBookmark } from "../services/actions/userActions";
import { defineCategory } from "@/utils/defineCategory";
import Icon from "./Icon";

interface Props {
  article: Article;
}

// const BreakingNewsCard = lazy(() => import('./BreakingNewsCard'));
// const NormalNewsCard = lazy(() => import('./NormalNewsCard'));

const RegularNewsCard: React.FC<Props> = ({ article }) => {
  const { generalData, regularNewsData, setGeneralData, setRegularNewsData } =
    useNewsContext();

  const isBookmarked = 
  // useMemo(() => {
     generalData.user?.bookmarks?.some((a) => a.url === article.url);
  // }, [generalData.user?.bookmarks, article.url]);

  const displayedCategory = 
  // useMemo(() => {
    // if (
      regularNewsData.category &&
      !["Home", "Favorites"].includes(regularNewsData.category) ?
    // ) {
       regularNewsData.category.toUpperCase() :
    // } else {
       defineCategory(
        article.title.toLowerCase()
      );
    // }
  // }, [regularNewsData.category, article.url]);

  const toggleBookmark = async () => {
    const token = localStorage.getItem("token") || "";
    if (!generalData.user || !token) return;

    try {
      const user = isBookmarked
        ? await removeBookmark(article.url, token)
        : await addBookmark(article, token);

      localStorage.setItem("user", JSON.stringify(user));

      setGeneralData((prev) => ({ ...prev, user: user }));
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
            (a) =>
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
    } catch (err: any) {
      console.error("Bookmark error:", err.message);
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
    <div className={"article-card" + (displayedCategory === "BREAKING" ? " breaking-news" : "")}>
      <img
        src={article.urlToImage || "/images/default-image.png"}
        alt={article.title}
        height="140px"
        className="thumbnail"
      />
      <div className="article-info">
        {/* DODAT CATEGORY i LOGIKU ZA ODREDIT CATEGORY */}
        {displayedCategory === "BREAKING" ? <div className="alert">BREAKING</div> : ""}
        <p>{displayedCategory}</p>
        <h3>{article.title}</h3>
        <span className="source">{article.author}</span>
      </div>
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        onClick={toggleBookmark}
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        <Icon
          name="star"
          fill={isBookmarked ? "yellow" : "#fff"}
          stroke="#1D1D1B"
          width="15"
          height="15"
          viewBox="0 0 20 20"
        />
      </button>
      {displayedCategory === "PROGRAMMATIC/NATIVE AD" ? <div className="ad">AD</div> : ""}
    </div>
          // </Suspense>
  );
};

export default RegularNewsCard;
