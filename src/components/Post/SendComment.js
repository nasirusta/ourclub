import { Fragment, memo } from "react";
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Typography,
} from "@mui/material";
import { MdSend } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { stringAvatar } from "../../helper/UserHelper";
import { useSelector } from "react-redux";
import { userMemo } from "../../store/selector";
import { useFormik } from "formik";
import { sendCommentRequest } from "../../store/actions/postAction";

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

const ClubPhoto = ({ avatar, name, url }) => {
  return (
    <a href={url}>
      <Fragment>
        {avatar && <Avatar sx={listStyle.avatar} src={avatar} />}
        {!avatar && <Avatar {...stringAvatar(`${name}`, 32, 32)} />}
      </Fragment>
    </a>
  );
};

const SendComment = ({ postID, commentList, setCommentList }) => {
  const { currentUser } = useSelector(userMemo);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      sendCommentRequest(values, postID, currentUser)
        .then((res) => {
          setCommentList([...commentList, res]);
          resetForm();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <div className="sendCommment">
      <ListItem alignItems="flex-start" sx={listStyle.listItem}>
        <ListItemAvatar sx={listStyle.listAvatar}>
          <ClubPhoto
            avatar={currentUser.providerData[0]?.photoURL}
            name={currentUser.displayName}
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
                  onChange={handleChange}
                  values={values.comment}
                  placeholder="Yorum yaz"
                  value={values.comment}
                />
                <button type="button" onClick={handleSubmit}>
                  <MdSend size={20} />
                </button>
              </div>
            </Typography>
          }
        />
      </ListItem>
    </div>
  );
};

export default memo(SendComment);
