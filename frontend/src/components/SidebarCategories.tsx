import { useNewsContext } from "../context/NewsContext";
import SidebarCategory from "./SidebarCategory";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import type { Category, IRegularNewsContextData } from "@/types/Context";
import { scrollToTop } from "@/utils/scrollToTop";
import { displayedCategories, ITEMS_PER_PAGE } from "@/data/commonData";
import { useCallback } from "react";
import "../styles/components/SidebarCategories.scss";

interface IProps {
  inWindow: boolean;
}

const SidebarCategories: React.FunctionComponent<IProps> = ({ inWindow }) => {
  const { userData, setRegularNewsData } = useNewsContext();

  const handleCategoryClick = useCallback((categoryName: Category) => {
    scrollToTop();

    setRegularNewsData((prev: IRegularNewsContextData) => ({
      ...prev,
      category: categoryName,
      searchInput: "",
      page: 1,
      isLoading: true,
    }));

    fetchRegularNewsData({
      setRegularNewsData,
      category: categoryName,
      searchInput: "",
      page: 1,
    });
  }, []);

  const handleFavoritesClick = () => {
    scrollToTop();

    setRegularNewsData((prev: IRegularNewsContextData) => ({
      ...prev,
      articles: userData!.bookmarks?.slice(0, ITEMS_PER_PAGE) || [],
      totalArticles: userData!.bookmarks?.length || 0,
      page: 1,
      category: "Favorites",
      error: null,
    }));
  };

  return (
    <aside className="sidebar">
      <SidebarCategory
        key="Home"
        category={{ name: "Home", icon: "home" }}
        inWindow={inWindow}
        handleCategoryClick={() => handleCategoryClick("Home")}
      />
      {userData && userData.bookmarks?.length > 0 ? (
        <SidebarCategory
          key="Favorites"
          category={{ name: "Favorites", icon: "star" }}
          inWindow={inWindow}
          handleCategoryClick={handleFavoritesClick}
        />
      ) : (
        ""
      )}
      {displayedCategories.map((category: Category) => (
        <SidebarCategory
          key={category}
          category={{ name: category, icon: category.toLowerCase() }}
          inWindow={inWindow}
          handleCategoryClick={() => handleCategoryClick(category)}
        />
      ))}
    </aside>
  );
};

export default SidebarCategories;
