import { useEffect, Fragment, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { MdFavorite } from "react-icons/md";
import { postLikeInit } from "../../store/actions/postAction";

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

const PostLike = ({ currentUser, data }) => {
  const [likedAction, SetLiked] = useState(true);
  const [likedCount, SetLikedCount] = useState(false);

  const handleClick = async () => {
    postLikeInit(data.postID, currentUser.uid).then((res) => {
      SetLikedCount(res.likesCount);
      SetLiked(res.liked);
    });
  };

  const checkLiked = async () => {
    let postLiked = !data.likes ? [] : data.likes;
    const filterLike = postLiked.find((row) => row.user === currentUser.uid);
    filterLike ?? SetLiked(false);
  };

  useEffect(() => {
    let postLikeCount = !data.likes ? [] : data.likes;
    SetLikedCount(postLikeCount.length);

    checkLiked();
  }, []);

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
