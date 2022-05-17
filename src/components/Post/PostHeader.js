import { IconButton, Avatar, CardHeader } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { stringAvatar } from "../../helper/UserHelper";

const PostHeader = ({ name, date }) => {
  return (
    <div className="postHeader">
      <CardHeader
        subheader={date}
        avatar={<Avatar {...stringAvatar(`${name} Kulübü`, 50, 50)} />}
        title={<div className="text-[17px] text-black">{name}</div>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
      />
    </div>
  );
};

export default PostHeader;
