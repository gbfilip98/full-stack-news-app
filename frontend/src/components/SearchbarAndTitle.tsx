import Icon from "./Icon";
import Searchbar from "./Searchbar";
// import { lazy, Suspense, useState } from "react";
// import { colors } from "@/data/constants";
// import Icon from "./Icon";

// const TopbarWindowMobile = lazy(() => import("./TopbarWindowMobile"));
// const LogoutWindow = lazy(() => import("./LogoutWindow"));

interface Window {
  // inWindow?: boolean;
  setTopbarWindowOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchbarAndTitle: React.FunctionComponent<Window> = ({
  setTopbarWindowOpened,
}) => {
  // const [topbarWindowOpened, setTopbarWindowOpened] = useState<boolean>(false);
  // const [logoutWindowOpened, setLogoutWindowOpened] = useState<boolean>(false);
  const inWindow = setTopbarWindowOpened ? false : true;

  return (
    <>
      <div className={"title-and-searchbar" + (inWindow ? " window" : "")}>
        <div className="title-wrapper">
          <h1>
            <span>My</span>News
          </h1>
          {inWindow ? (
            ""
          ) : (
            <button
              className="open-button"
              onClick={() =>
                setTopbarWindowOpened && setTopbarWindowOpened(true)
              }
            >
              <Icon
                name="open"
                width="20"
                height="20"
                alt="Open topbar window"
              />
            </button>
          )}
        </div>
        <Searchbar />
      </div>
    </>
  );
};
export default SearchbarAndTitle;
