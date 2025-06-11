import { useEffect, useState } from "react";
import { useNewsContext } from "../context/NewsContext";
import { type Article } from "../types/Article";
import Icon from "./Icon";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import { scrollToTop } from "@/utils/scrollToTop";
import { colors } from "@/data/constants";

const Searchbar: React.FunctionComponent = () => {
  const {
    userData,
    regularNewsData,
    isMobileDisplay,
    displayedNews,
    setRegularNewsData,
    setDisplayedNews
  } = useNewsContext();
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    scrollToTop();

    if (isMobileDisplay && displayedNews !== "regular-news") setDisplayedNews("regular-news");
    
    if (regularNewsData.category !== "Favorites") {
      setRegularNewsData((prev) => ({
        ...prev,
        page: 1,
        searchInput: input,
        isLoading: true
      }));

      console.log("search", regularNewsData.category, input);
      fetchRegularNewsData({ setRegularNewsData, category: regularNewsData.category, searchInput: input, page: 1 });
    } else {
      setRegularNewsData((prev) => {
        let filteredBookmarks: Article[] = [];
        const text = input.trim().toLowerCase();

        if (!text) {
          filteredBookmarks = userData!.bookmarks || [];
        } else {
          filteredBookmarks = userData!.bookmarks?.filter(
            (a: Article) =>
              a.title.toLowerCase().includes(text) ||
              a.description?.toLowerCase().includes(text) ||
              false
          );
        }

        return {
          ...prev,
          articles: filteredBookmarks,
          totalArticles: filteredBookmarks.length,
          page: 1,
          searchInput: input
        };
      });
    }
  };

  useEffect(() => {
    setInput("");
  }, [regularNewsData.category]); // when category is clicked this is triggered

  console.log("regularNewsData", regularNewsData);

  return (
    <div className="searchbar-container">
      <Icon name="search" width={20} height={20} viewBox="0 0 20 20" fill={colors.color_black_secondary} className="search-icon" alt="Search news by text"/> 
      <input
        type="text"
        name="searchInput"
        placeholder="Search news"
        value={input}
        onChange={handleChange}
        aria-label="Search news by text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchClick();
          }
        }}
      />
      <button onClick={handleSearchClick}>SEARCH</button>
    </div>
  );
};

export default Searchbar;
