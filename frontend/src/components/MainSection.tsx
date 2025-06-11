import NewsSection from "./NewsSection";
import SidebarCategories from "./SidebarCategories";
import "../styles/components/MainSection.scss";
// import { useNewsContext } from "@/context/NewsContext";

const MainSection: React.FunctionComponent = () => {
  // const { generalData } = useNewsContext();
  
  return (
    <section className="main-section-wrapper">
      <div className="main-section-layout">
        <SidebarCategories inWindow={false}/>
        <NewsSection />   {/* CHANGE NAMING */}
      </div>
    </section>
  );
};

export default MainSection;
