import NewsSection from "./NewsSection";
import SidebarCategories from "./SidebarCategories";
import "../styles/components/MainSection.scss";
import { useNewsContext } from "@/context/NewsContext";

const MainSection: React.FunctionComponent = () => {
  const { generalData } = useNewsContext();
  
  return (
    <section className={"section-one-wrapper" + (generalData.windowOpened ? " window" : "")}>
      <div className="section-layout">
        <SidebarCategories />
        <NewsSection />   {/* CHANGE NAMING */}
      </div>
    </section>
  );
};

export default MainSection;
