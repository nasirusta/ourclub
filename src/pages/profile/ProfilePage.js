import { LeftSide, RightSide } from "../../components";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const ProfilePage = () => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="flex flex-wrap w-full">
      {windowWidth > 767 && (
        <div className="w-1/4">
          <LeftSide />
        </div>
      )}
      <div className="md:w-2/4 w-full">
        <ProfileCard />
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4 mt-4">
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
