import React from 'react';
import { type Article } from '../types/Article';
import BookmarkButton from './BookmarkButton';
import './ArticleCard.scss';

interface Props {
  article: Article;
  // onBookmark: (id: string) => void;
}

const ArticleCard: React.FunctionComponent<Props> = ({ article, /* onBookmark */ }) => {
  return (
    <div className="article-card">
      <img src={article.urlToImage || '/placeholder.jpg'} alt={article.title} height="" width=""/>
      {/* <h3>{article.title}</h3>
      <p>{article.description}</p>
      <button onClick={() => onBookmark(article.url)}>🔖 Bookmark</button> */}
      <div className="article-content">
        <div className="article-header">
          <h2>{article.title}</h2>
          <BookmarkButton /* articleId={article.source.id} */ />
        </div>
        <p className="article-meta">
          {new Date(article.publishedAt).toLocaleString()} {/* | {article.category} */}
        </p>
        <p className="article-source">Source: {article.source.name}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read full article →
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;