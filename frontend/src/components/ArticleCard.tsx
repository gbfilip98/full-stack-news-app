import React from 'react';
import type { Article } from '../types/Article';

interface Props {
  article: Article;
  onBookmark: (id: string) => void;
}

const ArticleCard: React.FC<Props> = ({ article, onBookmark }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage || '/placeholder.jpg'} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <button onClick={() => onBookmark(article.url)}>🔖 Bookmark</button>
    </div>
  );
};

export default ArticleCard;