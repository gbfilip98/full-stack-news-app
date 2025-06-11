import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User } from '../types/User';
import { type InfiniteNewsContextData, type RegularNewsContextData } from '../types/Context';
// import dummyArticles from "../data/dummyArticles.json";

interface NewsProviderProps {
  children: ReactNode;
}

const NewsContext = createContext<{
  userData: User | null;
  regularNewsData: RegularNewsContextData;
  infiniteNewsData: InfiniteNewsContextData;
  displayedNews: DisplayedNews;
  isMobileDisplay: boolean;

  handleLogout: () => void;

  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  setRegularNewsData: React.Dispatch<React.SetStateAction<RegularNewsContextData>>;
  setInfiniteNewsData: React.Dispatch<React.SetStateAction<InfiniteNewsContextData>>;
  setDisplayedNews: React.Dispatch<React.SetStateAction<DisplayedNews>>;
  setIsMobileDisplay: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

type DisplayedNews = "all-news" | "regular-news" | "infinite-news";

export const ITEMS_PER_PAGE = 16;

const defaultRegularNewsContextData: RegularNewsContextData = {
  articles: [],
  // articles: dummyArticles,
  totalArticles: 0,
  category: "Home",
  page: 1,
  searchInput: "",
  isLoading: true,
  error: null
}

const defaultInfiniteNewsContextData: InfiniteNewsContextData = {
  articles: [],
  // articles: dummyArticles,
  pageSize: 10,
  isLoading: true,
  error: null
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const storedUser = localStorage.getItem('user') || null;

  const [userData, setUserData] = useState<User | null>(storedUser ? JSON.parse(storedUser) as unknown as User : null);
  const [regularNewsData, setRegularNewsData] = useState<RegularNewsContextData>(defaultRegularNewsContextData);
  const [infiniteNewsData, setInfiniteNewsData] = useState<InfiniteNewsContextData>(defaultInfiniteNewsContextData);
  const [displayedNews, setDisplayedNews] = useState<DisplayedNews>("all-news");
  const [isMobileDisplay, setIsMobileDisplay] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setRegularNewsData(defaultRegularNewsContextData);
    setInfiniteNewsData(defaultInfiniteNewsContextData);
  }

  return (
    <NewsContext.Provider value={{ 
      userData,
      regularNewsData,
      infiniteNewsData,
      displayedNews,
      isMobileDisplay,
      
      handleLogout,

      setUserData,
      setRegularNewsData,
      setInfiniteNewsData,
      setDisplayedNews,
      setIsMobileDisplay,
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};