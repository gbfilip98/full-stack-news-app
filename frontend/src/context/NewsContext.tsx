import { createContext, useContext, useState } from "react";
import { type IUser } from "../types/User";
import {
  type DisplayedNews,
  type IInfiniteNewsContextData,
  type INewsProviderProps,
  type IRegularNewsContextData,
} from "../types/Context";
import {
  defaultInfiniteNewsContextData,
  defaultRegularNewsContextData,
} from "@/data/contextData";

const NewsContext = createContext<
  | {
      userData: IUser | null;
      regularNewsData: IRegularNewsContextData;
      infiniteNewsData: IInfiniteNewsContextData;
      displayedNews: DisplayedNews;
      isMobileDisplay: boolean;

      handleLogout: () => void;

      setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
      setRegularNewsData: React.Dispatch<
        React.SetStateAction<IRegularNewsContextData>
      >;
      setInfiniteNewsData: React.Dispatch<
        React.SetStateAction<IInfiniteNewsContextData>
      >;
      setDisplayedNews: React.Dispatch<React.SetStateAction<DisplayedNews>>;
      setIsMobileDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const NewsProvider = ({ children }: INewsProviderProps) => {
  const storedUser = localStorage.getItem("user") || null;

  const [userData, setUserData] = useState<IUser | null>(
    storedUser ? (JSON.parse(storedUser) as unknown as IUser) : null
  );
  const [regularNewsData, setRegularNewsData] =
    useState<IRegularNewsContextData>(defaultRegularNewsContextData);
  const [infiniteNewsData, setInfiniteNewsData] =
    useState<IInfiniteNewsContextData>(defaultInfiniteNewsContextData);
  const [displayedNews, setDisplayedNews] = useState<DisplayedNews>("all-news");
  const [isMobileDisplay, setIsMobileDisplay] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserData(null);

    setRegularNewsData(defaultRegularNewsContextData);
    setInfiniteNewsData(defaultInfiniteNewsContextData);
  };

  return (
    <NewsContext.Provider
      value={{
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
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};
