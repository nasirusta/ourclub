import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { FaRegUser, FaRegEnvelope, FaRegBell, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userMemo } from "../../store/selector";
import getSlug from "speakingurl";

const MobileFooter = () => {
  const { currentUser } = useSelector(userMemo);

  return (
    <div className="mobileFooter">
      <div className="container mx-auto">
        <ul>
          <li>
            <Link to="/">
              <FaHome size={22} />
            </Link>
          </li>
          <li>
            <a
              href={`/p/${getSlug(currentUser.username, {
                lang: "tr",
                symbols: false,
              })}`}
            >
              <FaRegUser size={22} />
            </a>
          </li>
          <li>
            <Link to="/">
              <Badge badgeContent={4} color="error">
                <FaRegBell size={22} />
              </Badge>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Badge badgeContent={4} color="error">
                <FaRegEnvelope size={22} />
              </Badge>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileFooter;
