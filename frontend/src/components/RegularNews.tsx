import { useNewsContext } from "../context/NewsContext";
import RegularNewsCard from "./RegularNewsCard";
import "../styles/components/RegularNews.scss";

const RegularNews = () => {
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
            regularNewsData.articles?.map(
              (
                article, index // STAVIT PRVA 4 DA SE PRIKAZU PA ONDA OSTALE
              ) => (
                <RegularNewsCard key={`${index}. regular url - ` + article.url} article={article} /> // MOZDA UZ POMOC GRIDA 2x2 i 2x1
              )
            )
          )}
        </>
      )}
    </>
  );
};
export default RegularNews;
