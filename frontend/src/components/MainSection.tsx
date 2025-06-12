import NewsSection from "./NewsSection";
import SidebarCategories from "./SidebarCategories";
import "../styles/components/MainSection.scss";

const MainSection: React.FunctionComponent = () => {
  return (
    <section className="main-section-wrapper">
      <div className="main-section-layout">
        <SidebarCategories inWindow={false} />
        <NewsSection />
      </div>
    </section>
  );
};

export default MainSection;
