import { useEffect, useRef, useState } from "react";
import { useNewsContext } from "../context/NewsContext";
import { fetchInfiniteNewsData } from "@/utils/fetchNewsData";
import InfiniteNewsCard from "./InfiniteNewsCard";
import Icon from "./Icon";
import type { IArticle } from "@/types/Article";
import type { IInfiniteNewsContextData } from "@/types/Context";
import { colors } from "@/data/commonData";
import "../styles/components/InfiniteNews.scss";

const InfiniteNews: React.FunctionComponent = () => {
  const { infiniteNewsData, setInfiniteNewsData } = useNewsContext();
  const [skipFetch, setSkipFetch] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => {
    const pageSize = infiniteNewsData.pageSize + 10;

    setInfiniteNewsData((prev: IInfiniteNewsContextData) => ({
      ...prev,
      isLoading: true,
    }));

    fetchInfiniteNewsData({ setInfiniteNewsData, pageSize });
  };

  useEffect(() => {
    if (!skipFetch) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          !infiniteNewsData.isLoading &&
          infiniteNewsData.articles.length > 0
        ) {
          handleLoadMore();
        }
      });

      if (endRef.current) {
        observer.current.observe(endRef.current);
      }

      return () => observer.current?.disconnect();
    } else {
      setSkipFetch(false);
    }
  }, [handleLoadMore]);

  return (
    <section className="infinite-section-wrapper">
      <div className="infinite-section-title">
        <Icon name="alert" fill={colors.color_red_primary} alt="Latest news" />
        <h2 className="title">Latest news</h2>
      </div>
      <div className="infinite-section">
        <div className="infinite-news-grid">
          {infiniteNewsData.articles?.map((article: IArticle, index: number) => (
            <InfiniteNewsCard
              key={`${index}. infinite url - ` + article.url}
              article={article}
            />
          ))}
        </div>
        {infiniteNewsData.isLoading ? <p>Loading...</p> : ""}

        <div ref={endRef} style={{ height: "30px" }} />
      </div>
      <div className="see-more">
        <p>See all news</p>
        <Icon
          name="arrow"
          width="8"
          height="20"
          viewBox="0 0 8 8"
          alt="See all news"
        />
      </div>
    </section>
  );
};

export default InfiniteNews;
