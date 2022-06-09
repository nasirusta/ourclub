import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../helper/UserHelper";
import TextTruncate from "react-text-truncate";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import getSlug from "speakingurl";

const ListLi = ({ data }) => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  const cUrl = getSlug(data.clubURL, {
    lang: "tr",
    symbols: false,
  });

  return (
    <li>
      {windowWidth > 1024 && (
        <Link to={`/${cUrl}`}>
          {data.clubAvatar === null && (
            <Avatar {...stringAvatar(`${data.clubName}`)} className="mr-2" />
          )}
          {data.clubAvatar !== null && (
            <Avatar src={data.clubAvatar} className="mr-2" />
          )}
          {data.clubName}
        </Link>
      )}
      {windowWidth < 1024 && (
        <Link to={`/${cUrl}`}>
          {data.clubAvatar === null && (
            <Avatar
              {...stringAvatar(`${data.clubName}`, 28, 28)}
              className="mr-1"
            />
          )}
          {data.clubAvatar !== null && <Avatar src={data.clubAvatar} />}
          <TextTruncate line={1} text={data.clubName} />
        </Link>
      )}
    </li>
  );
};

export default ListLi;
