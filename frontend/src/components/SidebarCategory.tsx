import { useNewsContext } from "@/context/NewsContext";
import Icon from "./Icon";
import { colors } from "@/data/commonData";
import { useMemo } from "react";

interface ICategory {
  name: string;
  icon: string;
}

interface IProps {
  category: ICategory;
  handleCategoryClick: (categoryName: string) => void;
  inWindow: boolean;
}

const SidebarCategory: React.FunctionComponent<IProps> = ({
  category,
  handleCategoryClick,
  inWindow,
}) => {
  const { regularNewsData } = useNewsContext();
  const chosenAsCategory = useMemo(() => {
    return regularNewsData.category === category.name;
  }, [regularNewsData.category, category.name]);
  const fill = useMemo(() => {
    return chosenAsCategory
      ? colors.color_red_primary
      : category.name === "Favorites"
      ? colors.color_yellow_primary
      : colors.color_black_secondary;
  }, [chosenAsCategory, regularNewsData.category, category.name]);

  return (
    <button
      onClick={() => handleCategoryClick(category.name)}
      className={"category" + (chosenAsCategory ? " chosen" : "")}
    >
      <Icon
        name={category.icon}
        fill={fill}
        stroke={
          category.name === "Favorites"
            ? chosenAsCategory
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
