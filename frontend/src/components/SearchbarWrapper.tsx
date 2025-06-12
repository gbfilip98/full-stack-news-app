import { useMemo } from "react";
import Icon from "./Icon";
import Searchbar from "./Searchbar";

interface IProps {
  setTopbarWindowOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchbarWrapper: React.FunctionComponent<IProps> = ({
  setTopbarWindowOpened,
}) => {
  const inWindow = useMemo(() => {
    return setTopbarWindowOpened ? false : true;
  }, []);

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
export default SearchbarWrapper;
