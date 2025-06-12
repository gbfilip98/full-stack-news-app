import SearchbarWrapper from "./SearchbarWrapper";
import SidebarCategories from "./SidebarCategories";
import Icon from "./Icon";
import { colors } from "@/data/commonData";

interface IProps {
  setLogoutWindowOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setTopbarWindowOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopbarWindow: React.FunctionComponent<IProps> = ({
  setTopbarWindowOpened,
  setLogoutWindowOpened,
}) => {
  return (
    <div className="topbar-window">
      <div className="topbar-window-buttons">
        <button
          onClick={() => {
            setLogoutWindowOpened(true);
          }}
          className="logout-button mobile"
        >
          <Icon
            name="logout"
            width="20"
            height="20"
            viewBox="3 3 18 18"
            fill={colors.color_black_primary}
            alt="Logout button on mobile screen"
          />
        </button>
        <button
          className="close-button"
          onClick={() => setTopbarWindowOpened(false)}
        >
          <Icon name="close" width="20" height="20" alt="Close topbar window" />
        </button>
      </div>
      <SearchbarWrapper />
      <SidebarCategories inWindow={true} />
    </div>
  );
};
export default TopbarWindow;
