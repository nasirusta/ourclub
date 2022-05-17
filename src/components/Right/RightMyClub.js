import { Avatar } from "@mui/material";
import { stringAvatar } from "../../helper/UserHelper";

const RightMyClub = ({ data }) => {
  return (
    <div className="block w-full py-2 border-b border-gray-300">
      <a className="flex flex-wrap items-center" href={`/${data.clubURL}`}>
        {typeof data.photoURL !== "undefined" && data.photoURL !== "" && (
          <Avatar src={data.photoURL} />
        )}
        {typeof data.photoURL !== "undefined" && data.photoURL === "" && (
          <Avatar {...stringAvatar(`${data.name}`, 32, 32)} />
        )}
        {typeof data.photoURL == "undefined" && (
          <Avatar {...stringAvatar(`${data.name}`, 42, 42)} />
        )}
        <span className="ml-3 text-lg font-bold text-gray-500">{data.name}</span>
      </a>
    </div>
  );
};

export default RightMyClub;
