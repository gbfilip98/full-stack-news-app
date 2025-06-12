import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import MainSection from "../components/MainSection";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import {
  fetchInfiniteNewsData,
  fetchRegularNewsData,
} from "@/utils/fetchNewsData";
import "../styles/components/Home.scss";

const Home: React.FunctionComponent = () => {
  const {
    userData,
    regularNewsData,
    displayedNews,
    setRegularNewsData,
    setInfiniteNewsData,
    setDisplayedNews,
    setIsMobileDisplay,
  } = useNewsContext();
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      displayedNews === "infinite-news" &&
      regularNewsData.category !== "Home"
    )
      setDisplayedNews("regular-news");
  }, [regularNewsData.category]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!userData || !token) navigate("/sign-in");
    if (hasFetched.current) return;
    hasFetched.current = true;

    const isMobile = window?.innerWidth <= 719;
    setIsMobileDisplay(isMobile);
    setDisplayedNews(isMobile ? "regular-news" : "all-news");

    fetchRegularNewsData({
      setRegularNewsData,
      category: "Home",
      searchInput: "",
      page: 1,
    });
    fetchInfiniteNewsData({ setInfiniteNewsData, pageSize: 10 });

    // // Setup interval - fetch latest data every five minutes
    // const id = setInterval(() => fetchInfiniteNewsData({ setInfiniteNewsData, pageSize: infiniteNewsData.pageSize }), 30000);

    // // Clean up on unmount
    // return () => clearInterval(id);
  }, []);

  return (
    <main className="main-content">
      <Navbar />
      <Topbar />
      <MainSection />
    </main>
  );
};

export default Home;
