import ClubData from "./ClubData";
import ClubAvatar from "./header/ClubAvatar";
import ClubBio from "./header/ClubBio";
import ClubEvent from "./header/ClubEvent";
import ClubLine from "./header/ClubLine";

const ClubHeader = ({ club }) => {
  console.log(club);

  return (
    <div className="clubHeader">
      <div className="cHeaderContainer">
        <div className="clubAvatar-div">
          <ClubAvatar data={club.data} />
        </div>
        <div className="clubMiddle">
          <ClubBio data={club.data} />
        </div>
        <div className="clubEvent">
          <ClubEvent data={club} />
        </div>
      </div>
      <ClubLine data={club.data} />
      <ClubData />
    </div>
  );
};

export default ClubHeader;
