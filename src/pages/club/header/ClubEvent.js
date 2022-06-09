import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { userMemo } from "../../../store/selector";
import {
  sendClubRequest,
  clubDisFollow,
} from "../../../store/actions/clubAction";
import { toaster } from "evergreen-ui";
import { TiCancel } from "react-icons/ti";

const ClubEvent = ({ data }) => {
  const windowWidth = useWindowWidth();
  const { currentUser } = useSelector(userMemo);
  const [userCheck, setCheck] = useState(false);
  const dispatch = useDispatch();

  const sendRequest = () => {
    dispatch(sendClubRequest(currentUser, data))
      .then(() => {
        toaster.success("Üye olundu");
      })
      .catch(() => {
        toaster.danger("Bir hata oluştu!");
      });
  };

  const disfollow = () => {
    dispatch(clubDisFollow(currentUser, data))
      .then(() => {
        toaster.success("Üyelikten çıktınız");
      })
      .catch(() => {
        toaster.danger("Bir hata oluştu!");
      });
  };

  useEffect(() => {
    if (data.clubData.members) {
      const n = data.clubData.members.filter(
        (user) => user.uid === currentUser.uid
      );
      if (n.length === 0) {
        setCheck(true);
      }
    } else {
      setCheck(true);
    }
  }, [windowWidth]);

  return (
    <div className="eventContainer">
      {data.clubID === currentUser.club && (
        <a href={`/manage-club`} className="editC">
          <span>Düzenle</span>
          <IoSettingsOutline size={20} />
        </a>
      )}
      {data.clubID !== currentUser.club && (
        <Fragment>
          <button type="button" className="sendMessage">
            <BsEnvelope size={20} />
          </button>
          {userCheck && (
            <button type="button" className="sendRequest" onClick={sendRequest}>
              {windowWidth > 500 && <span>Üyelik talebi gönder</span>}
              <IoPersonAddSharp size={20} />
            </button>
          )}
          {!userCheck && (
            <button type="button" className="sendRequest" onClick={disfollow}>
              {windowWidth > 500 && <span>Üyelikten Çık</span>}
              <TiCancel size={20} />
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ClubEvent;
