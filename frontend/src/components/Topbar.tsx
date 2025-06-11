import "../styles/components/Topbar.scss";
import Icon from "./Icon";
import SearchbarAndTitle from "./SearchbarAndTitle";
import { useNewsContext } from "@/context/NewsContext";
import { scrollToTop } from "@/utils/scrollToTop";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import { Suspense, useEffect, useState } from "react";
import TopbarWindowMobile from "./TopbarWindowMobile";
import LogoutWindow from "./LogoutWindow";

const Topbar: React.FunctionComponent = () => {
  const {
    regularNewsData,
    displayedNews,
    setRegularNewsData,
    setDisplayedNews,
  } = useNewsContext();
  const [topbarWindowOpened, setTopbarWindowOpened] = useState<boolean>(false);
  const [logoutWindowOpened, setLogoutWindowOpened] = useState<boolean>(false);

  const handleCloseCategory = () => {
    scrollToTop();

    setRegularNewsData((prev) => ({
      ...prev,
      category: "Home",
      searchInput: "",
      page: 1,
      isLoading: true,
    }));

    fetchRegularNewsData({
      setRegularNewsData,
      category: "Home",
      searchInput: "",
      page: 1,
    });
  };

  useEffect(() => {
    if (topbarWindowOpened) setTopbarWindowOpened(false);
  }, [regularNewsData.category, regularNewsData.searchInput])
  

  return (
    <div className="topbar">
      <SearchbarAndTitle setTopbarWindowOpened={setTopbarWindowOpened} />
      {/* <button
        onClick={() => {
          setLogoutWindowOpened(true);
        }}
        className="logout-button desktop"
      >
        <Icon
          name="logout"
          width="20"
          height="20"
          viewBox="3 3 18 18"
          fill={colors.color_black_primary}
          alt="Logout button on desktop screen"
        />
      </button> */}

      {/* 
      // "close-button" and "open-button" only visible on mobile screens
      // "logout-button desktop" only visible on desktop screens
      // "logout-button mobile" only visible on mobile screens 
      */}

      {/* Visible only on mobile screens */}
      <div className="mobile-filters">
        {regularNewsData.category !== "Home" ? (
          <div className="displayed-category">
            <p>{regularNewsData.category}</p>
            <button onClick={handleCloseCategory}>
              <Icon name="close" width="12" height="12" viewBox="0 0 20 20" alt="Close category" />
            </button>
          </div>
        ) : (
          <div className="filter-buttons">
            <button
              className={
                "filter-button" + (displayedNews === "regular-news"
                  ? " active"
                  : "")
              }
              onClick={() => setDisplayedNews("regular-news")}
            >
              Featured
            </button>
            <button
              className={
                "filter-button" + (displayedNews === "infinite-news"
                  ? " active"
                  : "")
              }
              onClick={() => setDisplayedNews("infinite-news")}
            >
              Latest
            </button>
          </div>
        )}
      </div>
      {topbarWindowOpened ? (
        <Suspense fallback={<div>Loading...</div>}>
          <TopbarWindowMobile
            setTopbarWindowOpened={setTopbarWindowOpened}
            setLogoutWindowOpened={setLogoutWindowOpened}
          />
        </Suspense>
      ) : (
        ""
      )}
      {logoutWindowOpened ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LogoutWindow setLogoutWindowOpened={setLogoutWindowOpened} />
        </Suspense>
      ) : (
        ""
      )}
    </div>
  );
};

export default Topbar;
