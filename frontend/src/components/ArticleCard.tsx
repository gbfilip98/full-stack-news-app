import { type Article } from '../types/Article';
import { useNewsContext } from '../context/NewsContext';
import { addBookmark, removeBookmark } from '../services/actions/userActions';
import '../styles/components/Home.scss';

interface Props {
  article: Article;
}

const ITEMS_PER_PAGE = 16;

const ArticleCard: React.FC<Props> = ({ article }) => {
  const { data, setData } = useNewsContext();
  const isBookmarked = data.user?.bookmarks?.some((a) => a.url === article.url);
  const token = localStorage.getItem('token') || "";

  const toggleBookmark = async () => {
    if (!data.user || !token) return;

    try {
      const user = isBookmarked
        ? await removeBookmark(article.url, token)
        : await addBookmark(article, token);
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setData((prev) => {
        let newPage = prev.sectionOne.page;
        let newArticles = prev.sectionOne.articles;
        let newTotalArticles = prev.sectionOne.totalArticles;

        let newBookmarks: Article[] = [];
        const text = data.sectionOne.searchInput.trim().toLowerCase();
        if (!text) {
          newBookmarks = user.bookmarks;
        } else {
          newBookmarks = user.bookmarks.filter(
            (a) =>
              a.title.toLowerCase().includes(text) ||
              (a.description?.toLowerCase().includes(text) || false)
          );
        }

        if (data.sectionOne.category === "Favorites") {
          let startingIndex = (prev.sectionOne.page - 1) * ITEMS_PER_PAGE;  // this represents the index of the first displayed article

          const noBookmarks = 
            prev.sectionOne.page > 1 && (newBookmarks?.length - startingIndex) < 1;
            // when user is viewing "Favorites", located on the page>1 
            // and he is unbookmarking articles until the length of bookmarks displayed on that page isn't zero
            // when user unbookmarks all bookmarks from that page then the display is updated to show the previous page with bookmarks from the previous page
          if (noBookmarks) { 
            startingIndex = startingIndex - ITEMS_PER_PAGE;
            newPage--;
          }

          newArticles = newBookmarks?.slice(startingIndex, startingIndex + ITEMS_PER_PAGE);  // newBookmarks' array needs to be sliced because displayed data.firstSection.articles' length can't be longer than ITEMS_PER_PAGE
          newTotalArticles = newBookmarks?.length;
        }
        
        return {
          ...prev,
          user: user,
          sectionOne: { 
            ...prev.sectionOne,
            articles: newArticles,
            totalArticles: newTotalArticles,
            page: newPage
          }
        }
      });
    } catch (err: any) {
      console.error('Bookmark error:', err.message);
      // setData(prev => ({
      //   ...prev,
      //   sectionOne: { 
      //     ...prev.sectionOne,
      //     error: err.message || "Bookmark error"
      //   }
      // }));
    }
  };

  // article.urlToImage?.replace(/\.(jpg|png)$/, '.webp')

  return (
    <div className="article-card">
      <img src={article.urlToImage || "/images/default-image.png"} alt={article.title} height="140px" className="thumbnail" />
      <div className="article-info">
        <h3>{article.title}</h3>
        {/* <p>{article.description || 'No description available.'}</p> */}
        <span className="source">{article.author}</span>
      </div>
      <button
        className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
        onClick={toggleBookmark}
        title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      >
        {isBookmarked ? '⭐' : '☆'}
      </button>
    </div>
  );
};

export default ArticleCard;