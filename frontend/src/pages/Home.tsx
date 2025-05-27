import { useEffect, useState } from "react";
import type { Article } from "../types/Article";
import api from '../services/api';
import type { NewsApiResponse } from '../types/Article';

const Home: React.FunctionComponent = () => {
  const [, setArticles] = useState<Article[]>([]);
  const [page, ] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [page]);


  //PRIBACIT U SERVICES
  const fetchArticles = async () => {
    const res = await api.get<NewsApiResponse>(`/articles?page=${page}`);
    setArticles(prev => [...prev, ...res.data.articles]);
  };

  //WRAPPAT CONTEXT OKO OVOGA
  return (
    <div>
      {/* {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
      <InfiniteScroll trigger={() => setPage(p => p + 1)} /> */}
    </div>
  );
};

export default Home;