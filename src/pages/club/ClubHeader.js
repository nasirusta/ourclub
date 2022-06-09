import StickyHeader from "./StickyHeader";
import ClubData from "./ClubData";
import ClubAvatar from "./header/ClubAvatar";
import ClubBio from "./header/ClubBio";
import ClubEvent from "./header/ClubEvent";
import ClubLine from "./header/ClubLine";
import ProgressBar from "@ramonak/react-progress-bar";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { progressMemo, clubPageMemo } from "../../store/selector";
import { Fragment } from "react";
const ClubHeader = () => {
  const { progress, start } = useSelector(progressMemo);
  const { currentClub, loading } = useSelector(clubPageMemo);

  return (
    <Fragment>
      <Fragment>
        <StickyHeader name={currentClub.clubData.name} />
      </Fragment>
      <div className="clubHeader">
        {start && <ProgressBar completed={progress} />}
        {loading && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
            <ReactLoading
              type={"spin"}
              color="#1976d2"
              height={32}
              width={32}
            />
          </div>
        )}
        {!loading && (
          <Fragment>
            <div className="cHeaderContainer">
              <div className="clubAvatar-div">
                <ClubAvatar />
              </div>
              <div className="clubMiddle">
                <ClubBio data={currentClub.clubData} />
              </div>
              <div className="clubEvent">
                <ClubEvent data={currentClub} />
              </div>
            </div>
            <ClubLine data={currentClub.clubData} />
            <ClubData data={currentClub} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ClubHeader;
