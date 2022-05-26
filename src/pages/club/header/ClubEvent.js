import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useEffect,Fragment,useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { userMemo } from "../../../store/selector";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const ClubEvent = ({ data }) => {
  const windowWidth = useWindowWidth();
  const { currentUser } = useSelector(userMemo);

  const sendRequest = () => {
    if (auth.currentUser) {
      const userDoc = doc(db, "clubs", data.clubID);
      let clubMembers;
      if (!data.clubData.members) {
        clubMembers = [];
      } else {
        clubMembers = data.clubData.members;
      }
      const d = new Date();
      const reqUser = {
        username: currentUser.username,
        uid: currentUser.uid,
        subscribed_time: d.getTime(),
      };
      updateDoc(userDoc, {
        members: [...clubMembers, reqUser],
      }).then(() => {
        alert("oldu");
      });
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {}, [windowWidth]);

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
          <button type="button" className="sendRequest" onClick={sendRequest}>
            {windowWidth > 500 && <span>Üyelik talebi gönder</span>}
            <IoPersonAddSharp size={20} />
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default ClubEvent;
