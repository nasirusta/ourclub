import { Fragment } from "react";
import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { useSelector } from "react-redux";
import { userMemo } from "../../../store/selector";

const ClubEvent = ({ data }) => {
  const { currentUser } = useSelector(userMemo);

  return (
    <div className="eventContainer">
      {data.recordID === currentUser.club && (
        <a href={`/manage-club`} className="editC">
          <span>Düzenle</span>
          <IoSettingsOutline size={20} />
        </a>
      )}
      {data.recordID !== currentUser.club && (
        <Fragment>
          <button type="button" className="sendMessage">
            <BsEnvelope size={20} />
          </button>
          <button type="button" className="sendRequest">
            <span>Üyelik talebi gönder</span>
            <IoPersonAddSharp size={20} />
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default ClubEvent;
