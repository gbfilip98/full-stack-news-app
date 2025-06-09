import { ITEMS_PER_PAGE, useNewsContext } from "../context/NewsContext";
import { fetchArticles } from "../services/actions/newsActions";
// import dummyArticles from '../data/dummyArticles.json';
import SidebarCategory from "./SidebarCategory";
import "../styles/components/SidebarCategories.scss";
import { displayedCategories } from "@/data/constants";

// export interface ICategory {
//   icon: string;
//   name: string;
// }

const SidebarCategories: React.FunctionComponent = () => {
  const { generalData, setRegularNewsData } = useNewsContext();

  const handleCategoryClick = async (category: string) => {
    if (!category) return;

    setRegularNewsData((prev) => ({
      ...prev,
      category: category,
      searchInput: "",
      page: 1,
      isLoading: true
    }));

    try {
      const response = await fetchArticles({
        category: category,
        page: 1,
      });

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
  };

  // const handleHomeClick = () => {
  //   setData(prev => ({
  //     ...prev,
  //     sectionOne: { ...prev.sectionOne, articles: dummyArticles, category: "home" },
  //   }));
  // };

  const handleFavoritesClick = () => {
    if (!generalData.user) return;

    setRegularNewsData((prev) => ({
      ...prev,
      articles: generalData.user!.bookmarks?.slice(0, ITEMS_PER_PAGE) || [], // ITEMS_PER_PAGE = 16;
      totalArticles: generalData.user!.bookmarks?.length || 0,
      page: 1,
      category: "Favorites",
      error: null
    }));
  };

  return (
    <aside className={"sidebar" + (generalData.windowOpened ? " window" : "")}>
      {generalData.user && generalData.user.bookmarks?.length > 0 ? (
        <SidebarCategory
          key="Favorites"
          categoryName="Favorites"
          categoryIcon="star"
          handleCategoryClick={handleFavoritesClick}
        />
      ) : (
        ""
      )}
      {displayedCategories.map((category) => (
        <SidebarCategory
          key={category}
          categoryName={category}
          categoryIcon={category.toLowerCase()}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </aside>
  );
};

export default SidebarCategories;
