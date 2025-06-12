import { useNewsContext } from "../context/NewsContext";
import Pagination from "./Pagination";
import InfiniteNews from "./InfiniteNews";
import RegularNews from "./RegularNews";
import { useMemo } from "react";
import { ITEMS_PER_PAGE } from "@/data/commonData";

const NewsSection: React.FunctionComponent = () => {
  const { userData, regularNewsData, displayedNews } = useNewsContext();

  const subtitle = useMemo(() => {
    return regularNewsData.category !== "Home"
      ? " - " + regularNewsData.category.toLowerCase()
      : "";
  }, [regularNewsData.category]);

  return (
    <div className="main-section">
      <h2 className="main-title">{"News" + subtitle}</h2>

      <div
        className={
          "all-news" +
          (!regularNewsData.isLoading && regularNewsData.articles?.length < 14
            ? " rows-number"
            : "")
        }
      >
        {displayedNews === "all-news" || displayedNews === "regular-news" ? (
          <RegularNews />
        ) : (
          ""
        )}
        {displayedNews === "all-news" || displayedNews === "infinite-news" ? (
          <InfiniteNews />
        ) : (
          ""
        )}
      </div>

      {(regularNewsData.totalArticles > ITEMS_PER_PAGE ||
        (regularNewsData.category === "Favorites" &&
          userData?.bookmarks.length && userData.bookmarks.length > ITEMS_PER_PAGE)) &&
      displayedNews !== "infinite-news" &&
      !regularNewsData.isLoading ? (
        <Pagination />
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsSection;
