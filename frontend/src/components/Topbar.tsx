import Icon from "./Icon";
import SearchbarWrapper from "./SearchbarWrapper";
import { useNewsContext } from "@/context/NewsContext";
import { scrollToTop } from "@/utils/scrollToTop";
import { fetchRegularNewsData } from "@/utils/fetchNewsData";
import { Suspense, useCallback, useEffect, useState } from "react";
import TopbarWindow from "./TopbarWindow";
import LogoutWindow from "./LogoutWindow";
import type { IRegularNewsContextData } from "@/types/Context";
import "../styles/components/Topbar.scss";

const Topbar: React.FunctionComponent = () => {
  const {
    regularNewsData,
    displayedNews,
    setRegularNewsData,
    setDisplayedNews,
  } = useNewsContext();
  const [topbarWindowOpened, setTopbarWindowOpened] = useState<boolean>(false);
  const [logoutWindowOpened, setLogoutWindowOpened] = useState<boolean>(false);

  const handleCloseCategory = useCallback(() => {
    scrollToTop();

    setRegularNewsData((prev: IRegularNewsContextData) => ({
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
  }, []);

  useEffect(() => {
    if (topbarWindowOpened) setTopbarWindowOpened(false);
  }, [regularNewsData.category, regularNewsData.searchInput]);

  return (
    <div className="topbar">
      <SearchbarWrapper setTopbarWindowOpened={setTopbarWindowOpened} />

      {/* Visible only on mobile screens */}
      <div className="mobile-filters">
        {regularNewsData.category !== "Home" ? (
          <div className="displayed-category">
            <p>{regularNewsData.category}</p>
            <button onClick={handleCloseCategory}>
              <Icon
                name="close"
                width="12"
                height="12"
                viewBox="0 0 20 20"
                alt="Close category"
              />
            </button>
          </div>
        ) : (
          <div className="filter-buttons">
            <button
              className={
                "filter-button" +
                (displayedNews === "regular-news" ? " active" : "")
              }
              onClick={() => setDisplayedNews("regular-news")}
            >
              Featured
            </button>
            <button
              className={
                "filter-button" +
                (displayedNews === "infinite-news" ? " active" : "")
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
          <TopbarWindow
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
