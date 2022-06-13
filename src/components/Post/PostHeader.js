import { Fragment, useEffect } from "react";
import { IconButton, Avatar, CardHeader } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { stringAvatar } from "../../helper/UserHelper";
import { useWindowWidth } from "@react-hook/window-size";

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

  var timestamp = 1607110465663
  
var datem = new Date(date);
console.log(datem.getTime())
// console.log(datem)

  return (
    <div className="postHeader">
      {avatar !== null && (
        <Fragment>
          {windowWidth > 767 && (
            <CardHeader
              subheader={
                <span>{`${d.toTimeString()}`}</span>
              }
              avatar={
                <a href={clubURL}>
                  <Avatar src={avatar} sx={{ width: 50, height: 50 }} />
                </a>
              }
              title={
                <div className="text-[17px] text-black">
                  <a href={clubURL}>{name}</a>
                </div>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
            />
          )}
          {windowWidth < 767 && (
            <CardHeader
              subheader={date}
              avatar={
                <a href={clubURL}>
                  <Avatar src={avatar} sx={{ width: 32, height: 32 }} />
                </a>
              }
              title={<div className="text-[17px] text-black">{name}</div>}
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
            />
          )}
        </Fragment>
      )}
      {avatar === null && (
        <Fragment>
          {windowWidth > 767 && (
            <CardHeader
              subheader={date}
              avatar={
                <a href={clubURL}>
                  <Avatar {...stringAvatar(`${name} Kulübü`, 50, 50)} />
                </a>
              }
              title={<div className="text-[17px] text-black">{name}</div>}
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
            />
          )}
          {windowWidth < 767 && (
            <CardHeader
              subheader={date}
              avatar={
                <a href={clubURL}>
                  <Avatar {...stringAvatar(`${name} Kulübü`, 32, 32)} />
                </a>
              }
              title={<div className="text-[17px] text-black">{name}</div>}
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default PostHeader;
