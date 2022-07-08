import { CardActions } from "@mui/material";
import PostLike from "./PostLike";
import { IconButton } from "@mui/material";
import { FaComment } from "react-icons/fa";

const PostActions = ({ data, currentUser, commentCount }) => {
  return (
    <div className="postActions">
      <CardActions sx={{ p: 0, pl: 1.5 }}>
        <PostLike currentUser={currentUser} data={data} />
        <IconButton aria-label="comment">
          <FaComment size={18} />
          <span className="text-base mx-1">{commentCount}</span>
        </IconButton>
      </CardActions>
    </div>
  );
};

export default PostActions;
