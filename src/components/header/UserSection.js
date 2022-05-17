import ProfileSection from "./ProfileSection";
import UserNotifications from "./UserNotifications";
import { Link } from "react-router-dom";
import { Home, AddBox, Apps } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userMemo } from "../../store/selector";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

const UserSection = () => {
  const { currentUser } = useSelector(userMemo);
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="flex flex-wrap items-center md:justify-end justify-center">
      <div className="mr-4 md:mr-6">
        <Link to="/">
          <Home sx={{ fontSize: 28 }} />
        </Link>
      </div>
      {windowWidth > 767 && (
        <div className="block mr-2">
          {typeof currentUser.club === "undefined" && (
            <Button
              href="/create-club"
              variant="outlined"
              size="small"
              lang={"tr"}
            >
              <AddBox sx={{ fontSize: 20 }} />
            </Button>
          )}
          {typeof currentUser.club !== "undefined" && (
            <Button
              href={`/manage-club`}
              variant="outlined"
              size="small"
              lang={"tr"}
            >
              <Apps sx={{ fontSize: 20 }} />
            </Button>
          )}
        </div>
      )}
      <UserNotifications />
      <ProfileSection />
    </div>
  );
};

export default UserSection;
