import { useNavigate } from "react-router-dom";
import { useNewsContext } from "../context/NewsContext";
import Searchbar from "./Searchbar";
import "../styles/components/Topbar.scss";


const Topbar: React.FunctionComponent = () => {
  const {
    generalData,
    setGeneralData,
    handleLogout,
  } = useNewsContext();
  // const [windowOpened, setWindowOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className={"topbar" + (generalData.windowOpened ? " window" : "")}>
      <div className="title-and-searchbar">
        <div className="title">
          <h1>
            <span>My</span>News
          </h1>
          {generalData.windowOpened ? (
            <img
              src="/src/assets/icons/close.svg"
              alt="Close window"
              onClick={() =>
                setGeneralData((prev) => ({ ...prev, windowOpened: false }))
              }
            />
          ) : (
            <img
              src="/src/assets/icons/open.svg"
              alt="Open window"
              onClick={() =>
                setGeneralData((prev) => ({ ...prev, windowOpened: true }))
              }
            />
          )}
        </div>
        <Searchbar />
      </div>
      <button onClick={() => {
        handleLogout();
        navigate("/sign-in");
      }}>Logout</button>
    </div>
  );
};

export default Topbar;
