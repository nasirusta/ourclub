import ProfileSection from "../../components/header/ProfileSection";

const StickyHeader = ({ name }) => {
  return (
    <div className="StickyHeader">
      <div className="StickyContainer">
        <h1>{name}</h1>
      </div>
      <ProfileSection />
    </div>
  );
};

export default StickyHeader;
