import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../helper/UserHelper";
import { MdPhotoCamera } from "react-icons/md";

const ClubAvatar = ({ data }) => {
  return (
    <div className="clubAvatar">
      {typeof data.photoURL !== "undefined" && data.photoURL !== "" && (
        <Avatar src={data.photoURL} />
      )}
      {typeof data.photoURL !== "undefined" && data.photoURL === "" && (
        <div className="flex flex-col items-center">
          <div className="clubPhoto">
            <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
          </div>
          <button type="butotn" className="editClubPhotoBtn">
            <MdPhotoCamera size={24} />
          </button>
        </div>
      )}
      {typeof data.photoURL === "undefined" && (
        <div className="flex flex-col items-center">
          <div className="clubPhoto">
            <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
          </div>
          <button
            onClick={() => alert("sdas")}
            type="butotn"
            className="editClubPhotoBtn"
          >
            <MdPhotoCamera size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ClubAvatar;
