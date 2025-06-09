import { useNewsContext } from "../context/NewsContext";
import Pagination from "./Pagination";
import InfiniteNews from "./InfiniteNews";
import RegularNews from "./RegularNews";
import { useMemo } from "react";

const NewsSection: React.FunctionComponent = () => {
  const { regularNewsData } = useNewsContext();
  const subtitle = useMemo(() => {
    return regularNewsData.category !== "Home"
      ? " - " + regularNewsData.category.toLowerCase()
      : "";
  }, [regularNewsData.category])

  return (
    <div className="section-main">
      <h2>{"News" + subtitle}</h2>

      <div className="mobile-filters">
        <p>Featured</p>
        <p>Latest</p>
        {regularNewsData.category !== "Home" ? (
          <div className="mobile-displayed-category">
            <p>
              {regularNewsData.category}
            </p>
            <img
              src="/src/assets/icons/close.svg"
              alt="Close category"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className={
          "all-news" + (!regularNewsData.isLoading && regularNewsData.articles?.length < 14 ? " rows-number" : "")
        }
      >
        <RegularNews />
        <InfiniteNews />
      </div>

      <Pagination />
    </div>
  );
};

export default NewsSection;
