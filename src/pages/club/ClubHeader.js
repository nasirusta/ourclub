import ClubData from "./ClubData";
import ClubAvatar from "./header/ClubAvatar";
import ClubBio from "./header/ClubBio";
import ClubEvent from "./header/ClubEvent";
import ClubLine from "./header/ClubLine";
import ReactLoading from "react-loading";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { progressMemo } from "../../store/selector";
const ClubHeader = ({ currentClub }) => {
  const { progress, start } = useSelector(progressMemo);

  return (
    <div className="clubHeader">
      {start && <ProgressBar completed={progress} />}
      <div className="cHeaderContainer">
        <div className="clubAvatar-div">
          <ClubAvatar
            data={currentClub?.clubData}
            recordID={currentClub?.clubID}
          />
        </div>
        <div className="clubMiddle">
          <ClubBio data={currentClub?.clubData} />
        </div>
        <div className="clubEvent">
          <ClubEvent data={currentClub} />
        </div>
      </div>
      <ClubLine data={currentClub?.clubData} />
    </div>
  );
};

export default ClubHeader;
