import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../helper/UserHelper";

const ClubAvatar = ({ data }) => {
  return (
    <div className="clubAvatar">
      {typeof data.photoURL !== "undefined" && data.photoURL !== "" && (
        <Avatar src={data.photoURL} />
      )}
      {typeof data.photoURL !== "undefined" && data.photoURL === "" && (
        <Avatar {...stringAvatar(`${data.name}Club`, 128, 128)} />
      )}
      {typeof data.photoURL == "undefined" && (
        <Avatar {...stringAvatar(`${data.name}Club`, 128, 128)} />
      )}
    </div>
  );
};

export default ClubAvatar;
