import { useNewsContext } from "@/context/NewsContext";
import { useNavigate } from "react-router-dom";

interface IProps {
  setLogoutWindowOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutWindow: React.FunctionComponent<IProps> = ({
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
