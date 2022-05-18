import ClubData from "./ClubData";
import ClubAvatar from "./header/ClubAvatar";
import ClubBio from "./header/ClubBio";
import ClubEvent from "./header/ClubEvent";
import ClubLine from "./header/ClubLine";

const ClubHeader = () => {
  return (
    <div className="clubHeader">
      <div className="cHeaderContainer">
        <div className="clubAvatar-div">
          <ClubAvatar />
        </div>
        <div className="clubMiddle">
          <ClubBio />
        </div>
        <div className="clubEvent">
          <ClubEvent />
        </div>
      </div>
      <ClubLine />
      <ClubData />
    </div>
  );
};

export default ClubHeader;
