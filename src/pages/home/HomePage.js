import { LeftSide, RightSide, TimeLine } from "../../components";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const HomePage = () => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);
  return (
    <div className="flex flex-wrap w-full mt-4">
      {windowWidth > 767 && (
        <div className="w-1/4">
          <LeftSide />
        </div>
      )}
      <div className="md:w-2/4 w-full">
        <TimeLine />
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4">
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default HomePage;
