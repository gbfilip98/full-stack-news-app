import { useNewsContext } from "../context/NewsContext";
import RegularNewsCard from "./RegularNewsCard";
import "../styles/components/RegularNews.scss";
import type { Article } from "@/types/Article";

const RegularNews: React.FunctionComponent = () => {
  const { regularNewsData } = useNewsContext();

  return (
    <>
      {regularNewsData.isLoading ? (
        <p>Loading...</p>
      ) : regularNewsData.error ? (
        <p>{regularNewsData.error}</p>
      ) : (
        <>
          {regularNewsData.articles?.length === 0 ? (
            <p>No matching articles found.</p>
          ) : (
            regularNewsData.articles?.map((article: Article, index: number) => (
              <RegularNewsCard
                key={`${index}. regular url - ` + article.url}
                article={article}
              />
            ))
          )}
        </>
      )}
    </>
  );
};
export default RegularNews;
