import { type Article } from "../types/Article";

interface Props {
  article: Article;
}

const InfiniteNewsCard: React.FunctionComponent<Props> = ({ article }) => {
  const timeString = new Date(article.publishedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="infinite-news-card">
      <div className="info">
        <h3>{timeString}</h3>
        <span className="source">{article.title}</span>
      </div>
    </div>
  );
};

export default InfiniteNewsCard;
