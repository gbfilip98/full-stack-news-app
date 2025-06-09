import { useNewsContext } from "@/context/NewsContext";
import Icon from "./Icon";

interface Props {
  categoryName: string;
  categoryIcon: string;
  handleCategoryClick: (categoryName: string) => void;
}

const SidebarCategory: React.FunctionComponent<Props> = ({
  categoryName,
  categoryIcon,
  handleCategoryClick,
}) => {
  const { regularNewsData } = useNewsContext();
  // {"⭐"}
  const isChosen = regularNewsData.category === categoryName;
  const fill = isChosen ? "#BB1E1E" : categoryName === "Favorites" ? "yellow" : "#1D1D1B";

  return (
    <button onClick={() => handleCategoryClick(categoryName)} className={"category" + (isChosen ? " chosen" : "")}>
      {/* {category.charAt(0).toUpperCase() + category.slice(1)} */}
      {/* <i>{category.icon || "📂"}</i> */}
      {/* <img 
        src={`/src/assets/icons/${categoryIcon}.svg`}
        alt={categoryName}
        height="20px"
      /> */}
      <Icon name={categoryIcon} fill={fill} stroke={categoryName === "Favorites" ? isChosen ? "#BB1E1E" : "#1D1D1B" : undefined}/>
      <p>{categoryName}</p>
    </button>
  );
};

export default SidebarCategory;
