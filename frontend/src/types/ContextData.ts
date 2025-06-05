
import { type Article } from './Article';
import { type User } from './User';

export interface ContextData {
  // Query params used for each of the two article sections
  sectionOne: {
    articles: Article[];
    totalArticles: number;
    category: string;
    page: number;
    searchInput: string;
    isLoading?: boolean;
    error?: string | null;
  };
  // sectionOneFilterText: string;
  // sectionOnePage: number;
  
  sectionTwo: {
    articles: Article[];
    pagesOpened: number;
    isLoading?: boolean;
    error?: string | null;
  };

  // sectionOneParams
  // sectionTwoParams

  // Fetched articles
  // sectionOneArticles: Article[];
  // sectionTwoArticles: Article[];

  // Authenticated user data
  user: User | null;

  // Currently selected category
  // selectedCategory: string;

  // Loading and error state (optional)
  // isLoading?: boolean;
  // error?: string | null;
}