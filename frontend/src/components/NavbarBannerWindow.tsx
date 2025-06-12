import Icon from "./Icon";

interface IProps {
  setBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarBannerWindow: React.FunctionComponent<IProps> = ({
  setBannerVisible,
  setMessageOpened,
}) => {
  return (
    <div className="banner-window-overlay">
      <div className="banner-window">
        <button
          onClick={() => {
            setBannerVisible(false);
            setMessageOpened(false);
          }}
        >
          <Icon name="close" width="20" height="20" alt="Close banner" />
        </button>
        <div className="banner-message">
          To make this your homepage:
          <br />
          <br />
          1. Open your browser settings.
          <br />
          2. Find &quot;Homepage&quot; or &quot;On startup&quot;.
          <br />
          {`3. Enter: ${window.location.href}`}
        </div>
      </div>
    </div>
  );
};

export default NavbarBannerWindow;
