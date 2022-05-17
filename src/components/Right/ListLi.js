import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../helper/UserHelper";
import TextTruncate from "react-text-truncate";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import getSlug from "speakingurl";

const ListLi = ({ title }) => {
  const windowWidth = useWindowWidth();

  useEffect(() => {}, [windowWidth]);

  const cUrl = getSlug(title, {
    lang: "tr",
    symbols: false,
  });

  return (
    <li>
      {windowWidth > 1024 && (
        <Link to={`/${cUrl}`}>
          <Avatar {...stringAvatar(`${title}`)} className="mr-2" />
          {title}
        </Link>
      )}
      {windowWidth < 1024 && (
        <Link to={`/${cUrl}`}>
          <Avatar {...stringAvatar(`${title}`, 28, 28)} className="mr-1" />
          <TextTruncate line={1} text={title} />
        </Link>
      )}
    </li>
  );
};

export default ListLi;
