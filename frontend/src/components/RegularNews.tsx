import { useNewsContext } from "../context/NewsContext";
import RegularNewsCard from "./RegularNewsCard";
import type { IArticle } from "@/types/Article";
import "../styles/components/RegularNews.scss";

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
            regularNewsData.articles?.map((article: IArticle, index: number) => (
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
