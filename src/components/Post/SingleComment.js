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
  return (
    <div className="comment">
      <List sx={listStyle.List}>
        <ListItem alignItems="flex-start" sx={listStyle.listItem}>
          <ListItemAvatar sx={listStyle.listAvatar}>
            <Avatar
              sx={listStyle.avatar}
              src={"https://openclipart.org/image/800px/215819"}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ mt: 0, mb: 0 }}
            primary={<div className="commentName">{comment.name}</div>}
            secondary={
              <Typography component="span" variant="body2">
                <div className="commentBody">
                  <ReadMoreReact
                    text={comment.body}
                    min={80}
                    ideal={100}
                    max={200}
                    readMoreText={"Tümünü Göster"}
                    className="read-more-button"
                  />
                </div>
                <div className="commentReactions">
                  <button type="button">
                    <AiFillLike size={20} />
                    <span>65</span>
                  </button>
                  <button type="button">
                    <AiFillDislike size={20} />
                    <span>12</span>
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
