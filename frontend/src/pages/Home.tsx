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

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultContextData, useNewsContext } from '../context/NewsContext';
import { fetchArticles } from '../services/actions/newsActions';
import Searchbar from '../components/Searchbar';
import ArticlesSection from '../components/ArticlesSection';
// import SectionTwo from './SectionTwo';
import '../styles/components/Home.scss';

const Home = () => {
  const { data, setData } = useNewsContext();
  const [trigger, setTrigger] = useState<boolean>(false);
  // console.log("user-context", data.user)
  // console.log("token", localStorage.getItem("token"))
  // console.log("user-local", localStorage.getItem("user"))
  // const user = localStorage.getItem("user")
  // console.log("user-const", ...user)
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setData(defaultContextData);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate('/sign-in');
  }
  
  const fetchSectionOneData = async () => {
    setData(prev => ({ 
      ...prev, 
      sectionOne: { 
        ...prev.sectionOne, 
        isLoading: true 
      } 
    }));

    try {
      const response = await fetchArticles({ 
        category: data.sectionOne.category, 
        page: data.sectionOne.page 
      });

      // const [catRes, scrollRes] = await Promise.all([
      //   fetchArticles({ category: data.sectionOne.category, page: data.sectionOne.page }),
      //   fetchArticles({ pageSize: data.sectionTwo.pageSize })
      // ]);

      setData(prev => ({
        ...prev,
        sectionOne: { 
          ...prev.sectionOne, 
          articles: response.articles, 
          totalArticles: response.totalResults, 
          isLoading: false,
          error: null
        },
      }));
    } catch (err: any) {
      console.error('Error loading articles:', err.message);
      setData(prev => ({ 
        ...prev, 
        sectionOne: { 
          ...prev.sectionOne, 
          error: err.message || 'Failed to load articles', 
          isLoading: false 
        } 
      }));
    }
  };

  const fetchSectionTwoData = async () => {
    setData(prev => ({ 
      ...prev, 
      sectionTwo: { 
        ...prev.sectionTwo, 
        isLoading: true 
      } 
    }));

    try {
      const response = await fetchArticles({ pageSize: 10 });

      setData(prev => ({
        ...prev,
        sectionTwo: { 
          articles: response.articles,
          pagesOpened: 1,
          isLoading: false, 
          error: null 
        },
      }));
    } catch (error: any) {
      console.error('Error loading articles:', error.message);
      setData(prev => ({ 
        ...prev, 
        sectionTwo: { 
          ...prev.sectionTwo, 
          error: error.message || 'Failed to load articles', 
          isLoading: false 
        } 
      }));
    }
  };

  useEffect(() => {
    if (!data.user || !token) navigate('/sign-in');
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchSectionOneData();
    fetchSectionTwoData();
  }, [])

  return (
    <div className="home-container">
      <main className="main-content">
        <div>
          <h1><span>My</span>News</h1>
          <Searchbar 
            trigger={trigger}
          />
          <button onClick={() => handleLogout()} >Logout</button>
        </div>
        <ArticlesSection 
          setTrigger={setTrigger}
        />
      </main>
    </div>
  );
};

export default Home;