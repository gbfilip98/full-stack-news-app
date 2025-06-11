import { useNewsContext } from "@/context/NewsContext";
import Icon from "./Icon";
import { colors } from "@/data/constants";

interface Category {
  name: string;
  icon: string;
}

interface Props {
  category: Category;
  handleCategoryClick: (categoryName: string) => void;
  inWindow: boolean;
}

const SidebarCategory: React.FunctionComponent<Props> = ({
  category,
  handleCategoryClick,
  inWindow
}) => {
  const { regularNewsData } = useNewsContext();
  const isChosen = regularNewsData.category === category.name;
  const fill = isChosen
    ? colors.color_red_primary
    : category.name === "Favorites"
    ? colors.color_yellow_primary
    : colors.color_black_secondary;

  return (
    <button
      onClick={() => handleCategoryClick(category.name)}
      className={"category" + (isChosen ? " chosen" : "")}
    >
      {/* {category.charAt(0).toUpperCase() + category.slice(1)} */}
      {/* <i>{category.icon || "📂"}</i> */}
      {/* <img 
        src={`/src/assets/icons/${categoryIcon}.svg`}
        alt={categoryName}
        height="20px"
      /> */}
      <Icon
        name={category.icon}
        fill={fill}
        stroke={
          category.name === "Favorites"
            ? isChosen
              ? colors.color_red_primary
              : colors.color_black_secondary
            : undefined
        }
        width={inWindow ? 24 : undefined}
        height={inWindow ? 24 : undefined}
        viewBox={inWindow ? "0 0 20 20" : undefined}
        alt={"Sidebar category - " + category.name}
      />
      <p>{category.name}</p>
    </button>
  );
};

export default SidebarCategory;
