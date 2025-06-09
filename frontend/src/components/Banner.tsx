import { useState } from "react";
import "../styles/components/Banner.scss";

interface Props {
  setBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Banner: React.FunctionComponent<Props> = ({ setBannerVisible }) => {
  const [messageOpened, setMessageOpened] = useState(false);
  return (
    <div className="banner-wrapper">
      <div className="banner">
          <div className="banner-texts">
              <p>Make MyNews your homepage</p>
              <p>Every day discover what’s trending on the internet!</p>
          </div>
          <div className="banner-buttons">
              <button onClick={() => setBannerVisible(false)}>No, thanks</button>
              <button onClick={() => setMessageOpened(true)}>GET</button>
          </div>
      </div>
      {messageOpened ? <div className="banner-message">{`To make this your homepage:\n\n1. Open your browser settings.\n2. Find "Homepage" or "On startup".\n3. Enter: ${window.location.href}`}</div> : ""}
    </div>
  );
};

export default Banner;
