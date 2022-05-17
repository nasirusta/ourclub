import { CardActions } from "@mui/material";
import PostLike from "./PostLike";
import PostShare from "./PostShare";
import { IconButton } from "@mui/material";
import { FaComment } from "react-icons/fa";

const PostActions = () => {
  return (
    <div className="postActions">
      <CardActions sx={{ p: 0, pl: 1.5 }}>
        <PostLike />
        <IconButton aria-label="comment">
          <FaComment size={20} />
          <span className="text-base mx-1">9</span>
        </IconButton>
        <PostShare />
      </CardActions>
    </div>
  );
};

export default PostActions;
