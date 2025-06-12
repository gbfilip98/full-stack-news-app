import { lazy, useState } from "react";
import Icon from "./Icon";
import LogoutWindow from "./LogoutWindow";
import { colors } from "@/data/commonData";
import "../styles/components/Navbar.scss";

const NavbarBannerWindow = lazy(() => import("./NavbarBannerWindow"));

const Navbar: React.FunctionComponent = () => {
  const [messageOpened, setMessageOpened] = useState(false);
  const [logoutWindowOpened, setLogoutWindowOpened] = useState<boolean>(false);
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        {bannerVisible ? (
          <>
            <div className="banner-texts">
              <p>Make MyNews your homepage</p>
              <p>Every day discover what’s trending on the internet!</p>
            </div>
            <div className="banner-buttons">
              <button onClick={() => setBannerVisible(false)}>
                No, thanks
              </button>
              <button onClick={() => setMessageOpened(true)}>GET</button>
            </div>
          </>
        ) : (
          <button
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
              fill={colors.color_white_primary}
              alt="Logout button on desktop screen"
            />
          </button>
        )}
      </div>
      {messageOpened ? (
        <NavbarBannerWindow
          setBannerVisible={setBannerVisible}
          setMessageOpened={setMessageOpened}
        />
      ) : (
        ""
      )}
      {logoutWindowOpened ? (
        <LogoutWindow setLogoutWindowOpened={setLogoutWindowOpened} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
