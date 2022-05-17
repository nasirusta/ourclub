import ProfileSection from "../../components/header/ProfileSection";

const StickyHeader = () => {
  return (
    <div className="StickyHeader">
      <div className="StickyContainer">
        <h1>Geceleri Uyuyamayanlar Kulübü</h1>
      </div>
      <ProfileSection />
    </div>
  );
};

export default StickyHeader;
