import { colors } from "@/data/commonData";
import Icon from "./Icon";

interface IIcon {
  name: string;
  rotate: 0 | 180;
}

interface IProps {
  icon: IIcon;
  disabled: boolean;
  handleClick: () => void;
}

const PaginationButton: React.FunctionComponent<IProps> = ({
  icon,
  disabled,
  handleClick,
}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      <Icon
        name={icon.name}
        stroke={colors.color_gray_primary}
        fill={colors.color_gray_primary}
        viewBox="0 0 7 11"
        width="7"
        height="20"
        rotate={icon.rotate}
        alt={(icon.rotate ? "Right" : "Left") + " pagination button"}
      />
    </button>
  );
};

export default PaginationButton;
