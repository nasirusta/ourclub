import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { FaRegUser, FaRegEnvelope, FaRegBell, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userMemo } from "../../store/selector";
import getSlug from "speakingurl";

const UserRight = () => {
  const { currentUser } = useSelector(userMemo);

  return (
    <div className="UserRight">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <div className="iconSpan">
                <FaHome size={24} />
              </div>
              <div className="textSpan">Anasayfa</div>
            </Link>
          </li>
          <li>
            <a
              href={`/p/${getSlug(currentUser.username, {
                lang: "tr",
                symbols: false,
              })}`}
            >
              <div className="iconSpan">
                <FaRegUser size={24} />
              </div>
              <div className="textSpan">{currentUser.displayName}</div>
            </a>
          </li>
          <li>
            <Link to="/">
              <Badge badgeContent={4} color="error">
                <div className="iconSpan">
                  <FaRegBell size={24} />
                </div>
              </Badge>
              <div className="textSpan">Bildirimler</div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Badge badgeContent={4} color="error">
                <div className="iconSpan">
                  <FaRegEnvelope size={24} />
                </div>
              </Badge>
              <div className="textSpan">Mesajlar</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserRight;
