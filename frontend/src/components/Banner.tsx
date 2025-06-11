import { lazy, useState } from "react";
import "../styles/components/Banner.scss";
import Icon from "./Icon";
import { colors } from "@/data/constants";
import LogoutWindow from "./LogoutWindow";

const BannerWindowDesktop = lazy(() => import("./BannerWindowDesktop"));

// interface Props {
//   bannerVisible: boolean;
//   setBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Banner: React.FunctionComponent = () => {
  const [messageOpened, setMessageOpened] = useState(false);
  const [logoutWindowOpened, setLogoutWindowOpened] = useState<boolean>(false);
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);

  return (
    <div className="banner-wrapper">
      <div className="banner">
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
        // <Suspense fallback={<div>Loading...</div>}>
          <BannerWindowDesktop setBannerVisible={setBannerVisible} setMessageOpened={setMessageOpened}/>
        // </Suspense>
      ) : (
        ""
      )}
      {logoutWindowOpened ? (
        // <Suspense fallback={<div>Loading...</div>}>
          <LogoutWindow setLogoutWindowOpened={setLogoutWindowOpened} />
        // </Suspense>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
