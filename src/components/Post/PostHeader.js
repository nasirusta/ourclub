import { Fragment, useEffect } from "react";
import { IconButton, Avatar, CardHeader } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useWindowWidth } from "@react-hook/window-size";
import { stringAvatar } from "../../helper/UserHelper";

const ClubPhoto = ({ avatar, clubURL, name, windowWidth }) => {
  return (
    <a href={clubURL}>
      {windowWidth > 767 && (
        <Fragment>
          {avatar && <Avatar src={avatar} sx={{ width: 38, height: 38 }} />}
          {!avatar && <Avatar {...stringAvatar(`${name}Club`, 38, 38)} />}
        </Fragment>
      )}
      {windowWidth < 767 && (
        <Fragment>
          {avatar && <Avatar src={avatar} />}
          {!avatar && <Avatar {...stringAvatar(`${name}Club`, 32, 32)} />}
        </Fragment>
      )}
    </a>
  );
};

const PostHeader = ({ name, avatar, date, clubURL }) => {
  const windowWidth = useWindowWidth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date(date);

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="postHeader">
      <CardHeader
        sx={{ paddingBottom: 0 }}
        subheader={
          <span className="text-[13px]">{`${d.getHours()}:${d.getMinutes()} / ${d.getDate()} ${
            months[d.getMonth()]
          } ${d.getFullYear()}`}</span>
        }
        avatar={
          <ClubPhoto
            avatar={avatar}
            name={name}
            clubURL={clubURL}
            windowWidth={windowWidth}
          />
        }
        title={
          <div className="text-base text-black">
            <a href={clubURL}>{name}</a>
          </div>
        }
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
