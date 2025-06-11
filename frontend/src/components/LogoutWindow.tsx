import { useNewsContext } from "@/context/NewsContext";
import { useNavigate } from "react-router-dom";

interface Props {
  // handleLogout: () => void;
  setLogoutWindowOpened: React.Dispatch<React.SetStateAction<boolean>>;
  // (bannerVisible: boolean) => void;
}

const LogoutWindow: React.FunctionComponent<Props> = ({
  // handleLogout,
  setLogoutWindowOpened,
}) => {
  const { handleLogout } = useNewsContext();
  const navigate = useNavigate();

  return (
    <div className="logout-window-overlay">
      <div className="logout-window">
        <p>Are you sure you want to sign out?</p>
        <div className="buttons">
          <button
            onClick={() => {
              handleLogout();
              navigate("/sign-in");
            }}
          >
            Yes
          </button>
          <button onClick={() => setLogoutWindowOpened(false)}>No</button>
        </div>
      </div>
    </div>
  );
};
export default LogoutWindow;
