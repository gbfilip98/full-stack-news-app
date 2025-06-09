import Icon from "./Icon";

interface Props {
  disabled: boolean;
  iconName: string;
  rotate: number;
  handleClick: () => void;
}

const PaginationButton: React.FunctionComponent<Props> = ({
  disabled,
  iconName,
  rotate,
  handleClick,
}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      <Icon name={iconName} stroke="white" fill="white" viewBox="0 0 7 11" width="7" height="20" rotate={rotate}/>
      {/* <img
        src={`/src/assets/icons/${iconName}.svg`}
        alt={iconName + " - pagination"}
      /> */}
    </button>
  );
};

export default PaginationButton;
