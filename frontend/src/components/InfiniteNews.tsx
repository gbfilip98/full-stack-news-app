import { useEffect, useRef, useCallback, useState } from 'react';
import { useNewsContext } from '../context/NewsContext';
import ArticleCard from './ArticleCard';
import { fetchArticles } from '../services/actions/newsActions';
// import dummyArticles from "../data/dummyArticles.json"

const InfiniteNews = () => {
  const { data, setData } = useNewsContext();
  const [skipFetch, setSkipFetch] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    const pagesOpened = data.sectionTwo.pagesOpened + 1;

    setData(prev => ({
      ...prev,
      sectionTwo: { 
        ...prev.sectionTwo, 
        isLoading: true 
      },
    }));

    try {
      const response = await fetchArticles({ pageSize: 10, page: pagesOpened });
      console.log("load triggered")

      // const response = { articles: dummyArticles };
      const newArticles = response?.articles || [];

      setData(prev => ({
        ...prev,
        sectionTwo: {
          articles: [
            ...prev.sectionTwo.articles, 
            ...newArticles
          ], 
          pagesOpened: pagesOpened, 
          isLoading: false,
          error: null
        }
      }));
    } catch (error:any) {
      console.error('Error loading more articles:', error.message);
      setData(prev => ({
        ...prev,
        sectionTwo: { 
          ...prev.sectionTwo, 
          error: error.message || "Error loading more articles", 
          isLoading: false 
        },
      }));
    }
  }, [data.sectionTwo, setData]);

  useEffect(() => {
    if (!skipFetch) {
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !data.sectionTwo.isLoading && data.sectionTwo.articles.length > 0) {
          loadMore();
        }
      });
  
      if (endRef.current) {
        observer.current.observe(endRef.current);
      }
  
      return () => observer.current?.disconnect();
    } else {
      setSkipFetch(false);
    }
  }, [loadMore]);

  return (
    <section className="section-two">
      <h2>Latest news</h2>

      <div className="articles-grid">
        {data.sectionTwo?.articles?.map(article => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>

      <div ref={endRef} style={{ height: '30px' }} />
    </section>
  );
};

export default InfiniteNews;