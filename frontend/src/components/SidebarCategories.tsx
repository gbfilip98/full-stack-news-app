import { ITEMS_PER_PAGE, useNewsContext } from "../context/NewsContext";
// import { fetchArticles } from "../services/actions/newsActions";
// import dummyArticles from '../data/dummyArticles.json';
import SidebarCategory from "./SidebarCategory";
import "../styles/components/SidebarCategories.scss";
import { displayedCategories } from "@/data/constants";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import type { Category } from "@/types/Context";
import { scrollToTop } from "@/utils/scrollToTop";

// export interface ICategory {
//   icon: string;
//   name: string;
// }

interface Window {
  inWindow: boolean;
}

const SidebarCategories: React.FunctionComponent<Window> = ({ inWindow }) => {
  const { userData, setRegularNewsData } = useNewsContext();

  // const handleCategoryClick = async (category: string) => {
  //   // if (!category) return;

  //   setRegularNewsData((prev) => ({
  //     ...prev,
  //     category: category,
  //     searchInput: "",
  //     page: 1,
  //     isLoading: true
  //   }));

  //   try {
  //     const response = await fetchArticles({
  //       category: category,
  //       page: 1,
  //     });

  //     setRegularNewsData((prev) => ({
  //       ...prev,
  //       articles: response.articles,
  //       totalArticles: response.totalResults,
  //       isLoading: false,
  //       error: null
  //     }));
  //   } catch (err: any) {
  //     console.error("Error loading articles:", err.message);
  //     setRegularNewsData((prev) => ({
  //       ...prev,
  //       error: err.message || "Failed to load articles",
  //       isLoading: false
  //     }));
  //   }
  // };

  // const handleHomeClick = () => {
  //   setData(prev => ({
  //     ...prev,
  //     sectionOne: { ...prev.sectionOne, articles: dummyArticles, category: "home" },
  //   }));
  // };

  const handleCategoryClick = (categoryName: Category) => {
    // if (!category) return;
    scrollToTop();

    setRegularNewsData((prev) => ({
      ...prev,
      category: categoryName,
      searchInput: "",
      page: 1,
      isLoading: true
    }));

    fetchRegularNewsData({ setRegularNewsData, category: categoryName, searchInput: "", page: 1 })
  };

  const handleFavoritesClick = () => {
    scrollToTop();

    setRegularNewsData((prev) => ({
      ...prev,
      articles: userData!.bookmarks?.slice(0, ITEMS_PER_PAGE) || [], // ITEMS_PER_PAGE = 16;
      totalArticles: userData!.bookmarks?.length || 0,
      page: 1,
      category: "Favorites",
      error: null
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
          category={{ name: "Favorites", icon: "star"}}
          inWindow={inWindow}
          handleCategoryClick={handleFavoritesClick}
        />
      ) : (
        ""
      )}
      {displayedCategories.map((category: Category) => (
        <SidebarCategory
          key={category}
          category={{ name: category, icon: category.toLowerCase()}}
          inWindow={inWindow}
          handleCategoryClick={() => handleCategoryClick(category)}
        />
      ))}
    </aside>
  );
};

export default SidebarCategories;
