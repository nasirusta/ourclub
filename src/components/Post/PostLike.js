import { Fragment, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { MdFavorite } from "react-icons/md";

const liked = (count) => {
  return (
    <Fragment>
      <MdFavorite size={22} className="text-red-400" />
      <span className="text-base mx-1">{count}</span>
    </Fragment>
  );
};

const noLiked = (count) => {
  return (
    <Fragment>
      <MdFavorite size={22} />
      <span className="text-base mx-1">{count}</span>
    </Fragment>
  );
};

const PostLike = () => {
  const [likedAction, SetLiked] = useState(false);
  const [likedCount, SetLikedCount] = useState(0);

  const countForLike = async () => {
    if (likedAction) {
      SetLikedCount(likedCount - 1);
    } else {
      SetLikedCount(likedCount + 1);
    }
  };

  const handleClick = async () => {
    SetLiked(!likedAction);
    countForLike();
  };

  return (
    <Tooltip title={likedAction ? "Beğenmeyi geri al" : "Beğen"}>
      <IconButton
        aria-label="like"
        onClick={() => {
          handleClick();
        }}
      >
        {!likedAction && noLiked(likedCount)}
        {likedAction && liked(likedCount)}
      </IconButton>
    </Tooltip>
  );
};

export default PostLike;
