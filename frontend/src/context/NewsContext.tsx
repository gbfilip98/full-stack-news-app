import { createContext, useContext, useState, type ReactNode } from 'react';
// import { type Article } from '../types/Article';
import { type User } from '../types/User';
import { type GeneralContextData, type InfiniteNewsContextData, type RegularNewsContextData } from '../types/ContextData';
// import dummyArticles from "../data/dummyArticles.json";

interface NewsProviderProps {
  children: ReactNode;
}

const NewsContext = createContext<{
  // data: ContextData;
  generalData: GeneralContextData;
  regularNewsData: RegularNewsContextData;
  infiniteNewsData: InfiniteNewsContextData;

  // setData: React.Dispatch<React.SetStateAction<ContextData>>;
  handleLogout: () => void;

  setGeneralData: React.Dispatch<React.SetStateAction<GeneralContextData>>;
  setRegularNewsData: React.Dispatch<React.SetStateAction<RegularNewsContextData>>;
  setInfiniteNewsData: React.Dispatch<React.SetStateAction<InfiniteNewsContextData>>;
} | undefined>(undefined);

// export const defaultContextData: ContextData = {
//   sectionOne: {
//     articles: [],
//     totalArticles: 0,
//     category: 'Home',
//     page: 1,
//     searchInput: "",
//     isLoading: false,
//     error: null
//   },
//   sectionTwo: {
//     articles: [],
//     // articles: dummyArticles,
//     pagesOpened: 1,
//     isLoading: false,
//     error: null
//   },
//   user: null,
//   windowOpened: false,
// }

export const ITEMS_PER_PAGE = 16;

const defaultGeneralContextData = {
  user: null,
  windowOpened: false,
}

const defaultRegularNewsContextData = {
  articles: [],
  totalArticles: 0,
  category: 'Home',
  page: 1,
  searchInput: "",
  isLoading: true,
  error: null
}

const defaultInfiniteNewsContextData = {
  articles: [],
  // articles: dummyArticles,
  pageSize: 10,
  isLoading: true,
  error: null
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const storedUser = localStorage.getItem('user') || null;

  const [generalData, setGeneralData] = useState<GeneralContextData>({
    ...defaultGeneralContextData,
    user: storedUser ? JSON.parse(storedUser) as unknown as User : null,
  });
  const [regularNewsData, setRegularNewsData] = useState<RegularNewsContextData>(defaultRegularNewsContextData);
  const [infiniteNewsData, setInfiniteNewsData] = useState<InfiniteNewsContextData>(defaultInfiniteNewsContextData);
  // setData da promijeni sva tri u isto vrijeme
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setGeneralData(defaultGeneralContextData);
    setRegularNewsData(defaultRegularNewsContextData);
    setInfiniteNewsData(defaultInfiniteNewsContextData);
  }
  // const [data, setData] = useState<ContextData>({
  //   ...defaultContextData,
  //   user: storedUser ? JSON.parse(storedUser) as unknown as User : null,
  // });

  return (
    <NewsContext.Provider value={{ 
      handleLogout,
      generalData, setGeneralData,
      regularNewsData, setRegularNewsData,
      infiniteNewsData, setInfiniteNewsData
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