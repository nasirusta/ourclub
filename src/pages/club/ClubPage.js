import ClubHeader from "./ClubHeader";
import ClubRight from "./ClubRight";
import ClubLeft from "./ClubLeft";
import { TimeLine, SendPost, MobileFooter, UserRight} from "../../components";
import StickyHeader from "./StickyHeader";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const ClubPage = () => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="flex flex-wrap w-full">
      {windowWidth > 767 && (
        <div className="w-1/4">
          <ClubLeft />
        </div>
      )}
      <div className="md:w-2/4 w-full ">
        <StickyHeader />
        <ClubHeader />
        <SendPost />
        <TimeLine />
        {windowWidth < 768 && <MobileFooter />}
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4 space-y-2">
          <ClubRight />
          <UserRight />
        </div>
      )}
    </div>
  );
};

export default ClubPage;
