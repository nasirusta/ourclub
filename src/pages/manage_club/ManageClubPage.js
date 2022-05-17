import { LeftSide, RightSide } from "../../components";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { userMemo } from "../../store/selector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MClubCard from "./MClubCard";

const ManageClubPage = () => {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate();
  const { currentUser } = useSelector(userMemo);

  useEffect(() => {
    if (typeof currentUser.club === "undefined") {
      navigate(`/`);
    }
  }, [windowWidth]);

  return (
    <div className="flex flex-wrap w-full">
      {windowWidth > 767 && (
        <div className="w-1/4">
          <LeftSide />
        </div>
      )}
      <div className="md:w-2/4 w-full">
        <MClubCard />
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4 mt-4">
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default ManageClubPage;
