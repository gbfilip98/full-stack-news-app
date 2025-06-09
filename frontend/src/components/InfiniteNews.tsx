import { useEffect, useRef, useCallback, useState } from "react";
import { useNewsContext } from "../context/NewsContext";
import { fetchArticles } from "../services/actions/newsActions";
import InfiniteNewsCard from "./InfiniteNewsCard";
import Icon from "./Icon";
import { sortArticles } from "@/utils/sortArticles";
import "../styles/components/InfiniteNews.scss";
// import dummyArticles from "../data/dummyArticles.json"

const InfiniteNews = () => {
  const { infiniteNewsData, setInfiniteNewsData } = useNewsContext();
  const [skipFetch, setSkipFetch] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    const pageSize = infiniteNewsData.pageSize + 10;

    setInfiniteNewsData((prev) => ({
      ...prev,
      isLoading: true
    }));

    try {
      const response = await fetchArticles({ pageSize: pageSize });
      console.log("load triggered");

      // const response = { articles: dummyArticles };
      // const fetchedArticles = response?.articles || [];

      setInfiniteNewsData({
        articles: sortArticles(response.articles || []),
        pageSize: pageSize,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      console.error("Error loading more articles:", error.message);
      setInfiniteNewsData((prev) => ({
        ...prev,
        error: error.message || "Error loading more articles",
        isLoading: false
      }));
    }
  }, [infiniteNewsData, setInfiniteNewsData]);

  useEffect(() => {
    if (!skipFetch) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          !infiniteNewsData.isLoading &&
          infiniteNewsData.articles.length > 0
        ) {
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
    <div className="section-two-wrapper">
      <div className="section-two-title">
        <img 
          src="/src/assets/icons/alert.svg"
          alt="Latest news"
          height="20px"
          width="20px"
        />
        <h2>Latest news</h2>
      </div>
      <section className="section-two">
        <div className="infinite-news-grid">
          {infiniteNewsData.articles?.map((article, index) => (
            <InfiniteNewsCard key={`${index}. infinite url - ` + article.url} article={article} />
          ))}
        </div>

        <div ref={endRef} style={{ height: "30px" }} />
      </section>
      <div className="see-more">
        <p>See all news</p>
        <Icon name="arrow" width="8" height="20" viewBox="0 0 8 11"/>
        {/* <img
          src="/src/assets/icons/arrow-right.svg"
          alt="Right arrow"
        /> */}
      </div>
    </div>
  );
};

export default InfiniteNews;
