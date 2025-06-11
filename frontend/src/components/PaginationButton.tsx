import { colors } from "@/data/constants";
import Icon from "./Icon";

interface Icon {
  name: string;
  rotate: 0 | 180;
}

interface Props {
  disabled: boolean;
  icon: Icon;
  handleClick: () => void;
}

const PaginationButton: React.FunctionComponent<Props> = ({
  disabled,
  icon,
  handleClick,
}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      <Icon name={icon.name} stroke={colors.color_gray_primary} fill={colors.color_gray_primary} viewBox="0 0 7 11" width="7" height="20" rotate={icon.rotate} alt={(icon.rotate ? "Right" : "Left") + " pagination button"}/>
      {/* <img
        src={`/src/assets/icons/${iconName}.svg`}
        alt={iconName + " - pagination"}
      /> */}
    </button>
  );
};

export default PaginationButton;
