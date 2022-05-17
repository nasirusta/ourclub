import { LeftSide, RightSide } from "../../components";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import EditProfileCard from "./EditProfileCard";

const ProfileEditPage = () => {
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
        <EditProfileCard />
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4 mt-4">
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default ProfileEditPage;
