import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Typography,
} from "@mui/material";
import { MdSend } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

const listStyle = {
  listItem: {
    width: "100%",
    minWidth: "100%",
  },
  listAvatar: {
    mr: -2,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  sendComment: {
    mt: 1,
  },
};

const SendComment = () => {
  return (
    <div className="sendCommment">
      <ListItem alignItems="flex-start" sx={listStyle.listItem}>
        <ListItemAvatar sx={listStyle.listAvatar}>
          <Avatar
            sx={listStyle.avatar}
            src={"https://openclipart.org/image/800px/215819"}
          />
        </ListItemAvatar>
        <ListItemText
          sx={listStyle.sendComment}
          secondary={
            <Typography component="span" variant="body2">
              <div className="sendcommentIn">
                <TextareaAutosize
                  minRows={2}
                  maxRows={5}
                  name="comment"
                  placeholder="Yorum yaz"
                />
                <button type="button">
                  <MdSend size={22} />
                </button>
              </div>
            </Typography>
          }
        />
      </ListItem>
    </div>
  );
};

export default SendComment;
