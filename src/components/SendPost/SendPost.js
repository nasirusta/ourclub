import { useState, useEffect, Fragment } from "react";
import { Avatar, Button } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import { Send } from "@mui/icons-material";
import { stringAvatar } from "../../helper/UserHelper";
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import { userMemo, clubPageMemo } from "../../store/selector";
import { useDispatch, useSelector } from "react-redux";
import { sendContent } from "../../store/actions/clubAction";
import { getPostInit } from "../../store/actions/postAction";

const SendPost = () => {
  const windowWidth = useWindowWidth();
  const [clickField, setClick] = useState(false);
  const { currentUser } = useSelector(userMemo);
  const { currentClub, contentLoading } = useSelector(clubPageMemo);
  const dispatch = useDispatch();
  const handleClick = () => {
    setClick(true);
  };

  const share = () => {
    return (
      <textarea
        name="text"
        onChange={handleChange}
        values={values.post}
        placeholder="Birşeyler paylaş"
        autoFocus
      ></textarea>
    );
  };

  const shareDisabled = () => {
    return <span>Birşeyler paylaş</span>;
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: async (values) => {
      sendPostReq(values);
    },
  });

  const sendPostReq = (values) => {
    dispatch(sendContent(values, currentClub, currentUser))
      .then((res) => {
        setClick(false);
        // dispatch(getPostInit(currentClub));
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="sendPost">
      {contentLoading && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"bubbles"} color="#1976d2" height={32} />
        </div>
      )}
      {!contentLoading && (
        <Fragment>
          <div className="body">
            {currentUser.providerData[0]?.photoURL === null && (
              <div className="block">
                {windowWidth > 767 && (
                  <Avatar {...stringAvatar(currentUser.username, 50, 50)} />
                )}
                {windowWidth < 767 && (
                  <Avatar {...stringAvatar(currentUser.username, 32, 32)} />
                )}
              </div>
            )}
            {currentUser.providerData[0]?.photoURL !== null && (
              <div className="block">
                <Avatar src={`${currentUser.providerData[0]?.photoURL}`} />
              </div>
            )}
            <div
              className="postField"
              onClick={() => {
                handleClick();
              }}
            >
              {clickField ? share() : shareDisabled()}
            </div>
          </div>
          <div className="w-full flex flex-row-reverse my-2">
            {clickField ? (
              <Button
                onClick={handleSubmit}
                size="small"
                variant="contained"
                endIcon={<Send />}
              >
                Paylaş
              </Button>
            ) : (
              ""
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SendPost;
