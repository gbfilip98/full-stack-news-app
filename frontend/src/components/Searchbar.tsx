import { useEffect, useState } from "react";
import { useNewsContext } from "../context/NewsContext";
import { fetchArticles } from "../services/actions/newsActions";
import { type Article } from "../types/Article";
import Icon from "./Icon";

const Searchbar: React.FunctionComponent = () => {
  const {
    generalData,
    regularNewsData,
    setRegularNewsData,
  } = useNewsContext();
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (regularNewsData.category !== "Favorites") {
      setRegularNewsData((prev) => ({
        ...prev,
        page: 1,
        searchInput: input,
        isLoading: true
      }));

      try {
        console.log("search", regularNewsData.category, input);

        const response = await fetchArticles({
          category: regularNewsData.category,
          page: 1,
          searchInput: input.trim(),
        });

        // console.log("response",
        //   response
        // )

        setRegularNewsData((prev) => ({
          ...prev,
          articles: response.articles,
          totalArticles: response.totalResults,
          isLoading: false,
          error: null
        }));
      } catch (err: any) {
        console.error("Error loading articles:", err.message);
        setRegularNewsData((prev) => ({
          ...prev,
          error: err.message || "Failed to load articles",
          isLoading: false
        }));
      }
    } else {
      setRegularNewsData((prev) => {
        let filteredFavorites: Article[] = [];
        const text = input.trim().toLowerCase();

        if (!text) {
          filteredFavorites = generalData.user!.bookmarks || [];
        } else {
          filteredFavorites = generalData.user!.bookmarks?.filter(
            (a) =>
              a.title.toLowerCase().includes(text) ||
              a.description?.toLowerCase().includes(text) ||
              false
          );
        }

        return {
          ...prev,
          articles: filteredFavorites,
          totalArticles: filteredFavorites.length,
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
    <div className="search-bar-container">
      <Icon name="search" width={11.25} height={11.25} viewBox="0 0 20 20" fill="#1D1D1B"/> 
      {/* OPACITY 40% */}
      <input
        type="text"
        placeholder="Search news..."
        value={input}
        onChange={handleChange}
        aria-label="Search news by text"
      />
      <button onClick={() => handleClick()}>Search</button>
    </div>
  );
};

export default Searchbar;
