import { useNewsContext } from '../context/NewsContext';
import { fetchArticles } from '../services/actions/newsActions';
// import { fetchArticlesByCategory } from '../../services/newsService';
import ArticleCard from './ArticleCard';
import InfiniteNews from './InfiniteNews'; // nested here
import Sidebar from './Sidebar';

const ITEMS_PER_PAGE = 16;

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticlesSection: React.FunctionComponent<Props> = ({ setTrigger }) => {
  const { data, setData } = useNewsContext();
  const startIndex = (data.sectionOne.page - 1) * ITEMS_PER_PAGE;

  // const [loadingMore, setLoadingMore] = useState(false);

  // const loadMore = async () => {
  //   setLoadingMore(true);
  //   const nextPage = data.sectionOneParams.page + 1;

  //   try {
  //     const res = await fetchArticlesByCategory(data.sectionOneParams.category, nextPage);
  //     setData(prev => ({
  //       ...prev,
  //       sectionOneArticles: [...prev.sectionOneArticles, ...res.articles],
  //       sectionOneParams: { ...prev.sectionOneParams, page: nextPage },
  //     }));
  //   } catch {
  //     // Ignore for now, can add error handler
  //   } finally {
  //     setLoadingMore(false);
  //   }
  // };

  // const filteredArticles = useMemo(() => {
  //   const text = data.sectionOne.searchInput.trim().toLowerCase();
  //   if (!text) return data.sectionOne.articles;

  //   return data.sectionOne.articles.filter(
  //     (a) =>
  //       a.title.toLowerCase().includes(text) ||
  //       (a.description?.toLowerCase().includes(text) || false)
  //   );
  // }, [data.sectionOne.articles, data.sectionOne.searchInput]);

  // // Pagination slice
  // const startIndex = (data.sectionOne.page - 1) * ITEMS_PER_PAGE;
  // const pagedArticles = filteredArticles?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = async () => {
    setData(prev => ({ 
      ...prev, 
      sectionOne: { 
        ...prev.sectionOne, 
        isLoading: true 
      } 
    }));
    const nextPage: number = data.sectionOne.page + 1;

    if (data.sectionOne.category !== "Favorites") {
      try {
        const response = await fetchArticles({ 
          page: nextPage, 
          category: data.sectionOne.category, 
          searchInput: data.sectionOne.searchInput 
        });

        setData(prev => ({ 
          ...prev, 
          sectionOne: { 
            ...prev.sectionOne, 
            articles: response.articles, 
            totalArticles: response.totalResults, 
            page: nextPage, 
            isLoading: false,
            error: null
          } 
        }));
      } catch (error: any) {
        console.error('Error loading articles:', error.message);
        setData(prev => ({ 
          ...prev, 
          sectionOne: { 
            ...prev.sectionOne, 
            error: error.message || 'Failed to load articles', 
            isLoading: false 
          } 
        }));
      }
    } else {
      const newIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      setData(prev => ({
        ...prev, 
        sectionOne: { 
          ...prev.sectionOne,
          articles: prev.user!.bookmarks?.slice(newIndex, newIndex + ITEMS_PER_PAGE),
          totalArticles: prev.user!.bookmarks?.length,
          page: nextPage,
          isLoading: false,
          error: null
        }
      }));
    }
  };

  const handlePrev = async () => {
    setData(prev => ({ 
      ...prev, 
      sectionOne: { 
        ...prev.sectionOne, 
        isLoading: true 
      } 
    }));
    const prevPage: number = Math.max(1, data.sectionOne.page - 1);

    if (data.sectionOne.category !== "Favorites") {
      try {
        const response = await fetchArticles({ 
          page: prevPage, 
          category: data.sectionOne.category, 
          searchInput: data.sectionOne.searchInput 
        });

        setData(prev => ({ 
          ...prev, 
          sectionOne: { 
            ...prev.sectionOne, 
            articles: response.articles, 
            totalArticles: response.totalResults, 
            page: prevPage, 
            isLoading: false,
            error: null
          } 
        }));
      } catch (error: any) {
        console.error('Error loading articles:', error.message);
        setData(prev => ({ 
          ...prev, 
          sectionOne: { 
            ...prev.sectionOne, 
            error: error.message || 'Failed to load articles', 
            isLoading: false 
          } 
        }));
      }
    } else {
      const newIndex = (prevPage - 1) * ITEMS_PER_PAGE;
      setData(prev => ({
        ...prev, 
        sectionOne: { 
          ...prev.sectionOne,
          articles: prev.user!.bookmarks.slice(newIndex, newIndex + ITEMS_PER_PAGE),
          totalArticles: prev.user!.bookmarks?.length,
          page: prevPage,
          isLoading: false,
          error: null
        }
      }));
    }
  };

  // // Reset page when filter or articles change
  // useEffect(() => {
  //   setData(prev => ({ ...prev, sectionOne: { ...prev.sectionOne, page: 1 } }));
  // }, [data.sectionOne.searchInput, data.sectionOne.articles]);

  return (
    <section className="section-one-wrapper">
      <div className="section-layout">
        <Sidebar 
          setTrigger={setTrigger}
        />

        <div className="section-main">
          <h2>
            {"News" + (data.sectionOne.category !== "Home" ? " - " + data.sectionOne.category.toLocaleLowerCase() : "")}
            {/* {data.sectionOne.category === 'favorites'
              ? 'Your Bookmarked Articles'
              : data.sectionOne.category === 'home'
              ? 'Welcome Home'
              : `Top ${data.sectionOne.category} News`} */}
          </h2>

          {
            data.sectionOne.error 
            ? <p>{data.sectionOne.error}</p>
            :
            <div className="articles-grid">
              {data.sectionOne?.articles?.length === 0 ? (
                <p>No matching articles found.</p>
              ) : (
                data.sectionOne?.articles?.map(article => (
                  <ArticleCard key={article.url} article={article} />
                ))
              )}
            </div>
          }

          {/* {data.selectedCategory !== 'favorites' &&
            data.selectedCategory !== 'home' && (
              <button onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            )
          } */}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={data.sectionOne.page === 1}>
              ◀ Previous
            </button>
            <span>Page {data.sectionOne.page}</span>
            <button
              onClick={handleNext}
              disabled={startIndex + ITEMS_PER_PAGE >= data.sectionOne.totalArticles}
            >
              Next ▶
            </button>
          </div>

          <InfiniteNews />
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;