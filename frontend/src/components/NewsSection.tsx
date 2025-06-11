import { useNewsContext } from "../context/NewsContext";
import Pagination from "./Pagination";
import InfiniteNews from "./InfiniteNews";
import RegularNews from "./RegularNews";
import { useMemo } from "react";

const NewsSection: React.FunctionComponent = () => {
  const { regularNewsData, displayedNews } = useNewsContext();

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
        {displayedNews === "all-news" || displayedNews === "regular-news" ? ( // maybe lazy load
          <RegularNews />
        ) : (
          ""
        )}
        {displayedNews === "all-news" || displayedNews === "infinite-news" ? (  // maybe lazy load
          <InfiniteNews />
        ) : (
          ""
        )}
      </div>

      {regularNewsData.totalArticles > 16 && displayedNews && displayedNews !== "infinite-news" ? <Pagination /> : ""}
    </div>
  );
};

export default NewsSection;
