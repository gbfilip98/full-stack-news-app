import { createContext, useContext, useState, type ReactNode } from 'react';
// import { type Article } from '../types/Article';
import { type User } from '../types/User';
import { type ContextData } from '../types/ContextData';
// import dummyArticles from "../data/dummyArticles.json";

interface NewsProviderProps {
  children: ReactNode;
}

const NewsContext = createContext<{
  data: ContextData;
  setData: React.Dispatch<React.SetStateAction<ContextData>>;
} | undefined>(undefined);

export const defaultContextData: ContextData = {
  sectionOne: {
    articles: [],
    totalArticles: 0,
    category: 'Home',
    page: 1,
    searchInput: "",
    isLoading: false,
    error: null
  },
  sectionTwo: {
    articles: [],
    // articles: dummyArticles,
    pagesOpened: 1,
    isLoading: false,
    error: null
  },
  user: null,
}

export const NewsProvider = ({ children }: NewsProviderProps) => {
  const storedUser = localStorage.getItem('user') || null;
  const [data, setData] = useState<ContextData>({
    ...defaultContextData,
    user: storedUser ? JSON.parse(storedUser) as unknown as User : null,
  });

  return (
    <NewsContext.Provider value={{ data, setData }}>
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