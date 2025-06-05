import { useEffect, useState } from 'react';
import { useNewsContext } from '../context/NewsContext';
import { fetchArticles } from '../services/actions/newsActions';
import type { Article } from '../types/Article';

interface Props {
  trigger: boolean;
}

const Searchbar: React.FunctionComponent<Props> = ({ trigger }) => {
  const { data, setData } = useNewsContext();
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (data.sectionOne.category !== "Favorites") {
      setData(prev => ({ 
        ...prev, 
        sectionOne: { 
          ...prev.sectionOne, 
          page: 1, 
          searchInput: input, 
          isLoading: true
        } 
      }));

      try {
        console.log("search",
          data.sectionOne.category,
          input
        )
  
        const response = await fetchArticles({ 
          category: data.sectionOne.category, 
          page: 1, 
          searchInput: input.trim()
        });

        // console.log("response",
        //   response
        // )
  
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
    } else {
      setData(prev => {
        let filteredFavorites: Article[] = [];
        const text = input.trim().toLowerCase();

        if (!text) {
          filteredFavorites = prev.user!.bookmarks || [];
        } else {
          filteredFavorites = prev.user!.bookmarks?.filter(
            (a) =>
              a.title.toLowerCase().includes(text) ||
              (a.description?.toLowerCase().includes(text) || false)
          );
        }

        return {
          ...prev,
          sectionOne: { 
            ...prev.sectionOne, 
            articles: filteredFavorites,
            totalArticles: filteredFavorites.length,
            page: 1,
            searchInput: input,
          },
        }
      });
    }
  };

  useEffect(() => {
    setInput("");
  }, [trigger])
  

  console.log("data", data)

  return (
    <div className="search-bar-container">
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