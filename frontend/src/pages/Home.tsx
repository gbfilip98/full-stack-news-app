// import { useEffect, useState } from "react";
// import { type Article } from "../../types/Article";
// import { type NewsApiResponse } from '../../types/NewsApiResponse';
// import api from '../../services/api';

// const HomePage: React.FunctionComponent = () => {
//   const [, setArticles] = useState<Article[]>([]);
//   const [page, ] = useState(1);

//   useEffect(() => {
//     fetchArticles();
//   }, [page]);

//   //PRIBACIT U SERVICES
//   const fetchArticles = async () => {
//     const res = await api.get<NewsApiResponse>(`/articles?page=${page}`);
//     setArticles(prev => [...prev, ...res.data.articles]);
//   };

//   //WRAPPAT CONTEXT OKO OVOGA
//   return (
//     <div>
//       {/* {articles.map(article => (
//         <ArticleCard key={article.id} article={article} />
//       ))}
//       <InfiniteScroll trigger={() => setPage(p => p + 1)} /> */}
//     </div>
//   );
// };

// export default HomePage;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import { fetchArticles } from "../services/actions/newsActions";
import MainSection from "../components/MainSection";
// import SectionTwo from './SectionTwo';
import Topbar from "../components/Topbar";
import Banner from "../components/Banner";
import '../styles/components/Home.scss';

const Home = () => {
  const {
    generalData,
    regularNewsData,
    infiniteNewsData,
    setRegularNewsData,
    setInfiniteNewsData,
  } = useNewsContext();
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);
  // const [windowOpened, setWindowOpened] = useState<boolean>(false);
  // console.log("user-context", data.user)
  // console.log("token", localStorage.getItem("token"))
  // console.log("user-local", localStorage.getItem("user"))
  // const user = localStorage.getItem("user")
  // console.log("user-const", ...user)
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchSectionOneData = async () => {
    try {
      const response = await fetchArticles({
        category: regularNewsData.category,
        page: regularNewsData.page,
      });

      setRegularNewsData((prev) => ({
        ...prev,
        articles: response.articles,
        totalArticles: response.totalResults,
        isLoading: false,
        error: null
      }));
    } catch (err: any) {
      console.error("Error loading articles:", err.message);
      setRegularNewsData((prev) => ({
        ...prev,
        error: err.message || "Failed to load articles",
        isLoading: false
      }));
    }
  };

  const fetchSectionTwoData = async () => {
    try {
      const response = await fetchArticles({ pageSize: infiniteNewsData.pageSize });

      setInfiniteNewsData({
        articles: response.articles,
        pageSize: 10,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      console.error("Error loading articles:", error.message);
      setInfiniteNewsData((prev) => ({
        ...prev,
        error: error.message || "Failed to load articles",
        isLoading: false
      }));
    }
  };

  useEffect(() => {
    if (!generalData.user || !token) navigate("/sign-in");
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchSectionOneData();
    fetchSectionTwoData();
  }, []);

  return (
    <div /* className="home-container" */>
      {/* SPOJIT home-container i main-container u jedno, ILI CU STAVIT BANNER VANKA maina */}
      {bannerVisible ? <Banner setBannerVisible={setBannerVisible} /> : ""}
      <main className="main-content">
        <Topbar />
        <MainSection />{" "}
        {/* CHANGE NAMING */}
      </main>
    </div>
  );
};

export default Home;
