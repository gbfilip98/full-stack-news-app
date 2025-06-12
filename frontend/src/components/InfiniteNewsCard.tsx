import { useMemo } from "react";
import { type ISingleArticle } from "../types/Article";

const InfiniteNewsCard: React.FunctionComponent<ISingleArticle> = ({
  article,
}) => {
  const timeString = useMemo(() => {
    return new Date(article.publishedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [article.publishedAt]);

  return (
    <div className="infinite-news-card">
      <div className="info">
        <span>{timeString}</span>
        <h3>{article.title}</h3>
      </div>
    </div>
  );
};

export default InfiniteNewsCard;
