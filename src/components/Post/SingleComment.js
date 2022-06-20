import { Fragment, useState } from "react";
import ReadMoreReact from "read-more-react";
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  List,
  Typography,
} from "@mui/material";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { stringAvatar } from "../../helper/UserHelper";
import {
  commentLikeInit,
  commentDisLikInit,
} from "../../store/actions/postAction";

const PersonPhoto = ({ avatar, name }) => {
  return (
    <Fragment>
      {avatar === null && <Avatar {...stringAvatar(name, 32, 32)} />}
      {avatar !== null && <Avatar sx={listStyle.avatar} src={avatar} />}
    </Fragment>
  );
};

const listStyle = {
  List: {
    width: "100%",
    minWidth: "100%",
    bgcolor: "background.paper",
    pt: 0,
    pb: 0,
  },
  listItem: {
    pt: 0,
    pb: 0,
  },
  listAvatar: {
    mr: -2,
  },
  avatar: {
    width: 32,
    height: 32,
  },
};

const SingleComment = ({ comment }) => {
  const [likedCount, SetLikedCount] = useState(
    comment.commetData.likes?.length ?? 0
  );
  const [disLikedCount, SetDisLikedCount] = useState(
    comment.commetData.dis_likes?.length ?? 0
  );
  const commentLike = () => {
    commentLikeInit(comment.commetData.id, comment.user.uid).then((res) => {
      SetLikedCount(res.likesCount);
      SetDisLikedCount(res.disLikesCount);
    });
  };

  const commentDisLike = () => {
    commentDisLikInit(comment.commetData.id, comment.user.uid).then((res) => {
      SetLikedCount(res.likesCount);
      SetDisLikedCount(res.disLikesCount);
    });
  };

  return (
    <div className="comment">
      <List sx={listStyle.List}>
        <ListItem alignItems="flex-start" sx={listStyle.listItem}>
          <ListItemAvatar sx={listStyle.listAvatar}>
            <PersonPhoto
              avatar={comment.user.photoURL}
              name={comment.user.name}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ mt: 0, mb: 0 }}
            primary={<div className="commentName">{comment.user.username}</div>}
            secondary={
              <Typography component="span" variant="body2">
                <div className="commentBody">
                  <ReadMoreReact
                    text={comment.commetData.comment}
                    min={80}
                    ideal={100}
                    max={200}
                    readMoreText={"Tümünü Göster"}
                    className="read-more-button"
                  />
                </div>
                <div className="commentReactions">
                  <button type="button">
                    <AiFillLike size={20} onClick={() => commentLike()} />
                    <span>{likedCount}</span>
                  </button>
                  <button type="button">
                    <AiFillDislike size={20} onClick={() => commentDisLike()} />
                    <span>{disLikedCount}</span>
                  </button>
                </div>
              </Typography>
            }
          />
        </ListItem>
      </List>
    </div>
  );
};

export default SingleComment;
