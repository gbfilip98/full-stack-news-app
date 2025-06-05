import { useNewsContext } from '../context/NewsContext';
import { fetchArticles } from '../services/actions/newsActions';
// import dummyArticles from '../data/dummyArticles.json';
import '../styles/components/Home.scss';

const categories = [
  'Home',
  'Business',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FunctionComponent<Props> = ({ setTrigger }) => {
  const { data, setData } = useNewsContext();

  const handleCategoryClick = async (category: string) => {
    if (!category) return;
    setTrigger((prev) => !prev);

    setData(prev => ({ 
      ...prev, 
      sectionOne: { 
        ...prev.sectionOne, 
        category: category,
        searchInput: "",
        page: 1, 
        isLoading: true
      } 
    }));
    
    try {
      const response = await fetchArticles({ 
        category: category,
        page: 1 
      });

      setData(prev => ({
        ...prev,
        sectionOne: { 
          ...prev.sectionOne, 
          articles: response.articles, 
          totalArticles: response.totalResults, 
          isLoading: false,
          error: null
        },
      }));
    } catch (err: any) {
      console.error('Error loading articles:', err.message);
      setData(prev => ({ 
        ...prev, 
        sectionOne: { 
          ...prev.sectionOne, 
          error: err.message || 'Failed to load articles', 
          isLoading: false 
        } 
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
    if (!data.user) return;
    setTrigger((prev) => !prev);

    setData(prev => ({
      ...prev,
      sectionOne: { 
        ...prev.sectionOne, 
        articles: data.user!.bookmarks?.slice(0, 16) || [], 
        totalArticles: data.user!.bookmarks?.length || 0, 
        page: 1,
        category: "Favorites",
        error: null
      },
    }));
  };

  return (
    <aside className="sidebar">
      {
        data.user && data.user.bookmarks?.length > 0 
        ? <button onClick={() => handleFavoritesClick()}>⭐ Favorites</button> 
        : ""
      }
      {/* <button onClick={handleHomeClick}>🏠 Home</button> */}
      {categories.map(category => (
        <button key={category} onClick={() => handleCategoryClick(category)}>
          {/* 📂 {category.charAt(0).toUpperCase() + category.slice(1)} */}
          📂 {category}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;