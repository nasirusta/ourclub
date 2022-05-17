import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";

const ClubEvent = () => {
  return (
    <div className="eventContainer">
      <a href="/" className="editC">
        <span>Düzenle</span>
        <IoSettingsOutline size={20} />
      </a>
      <button type="button" className="sendMessage">
        <BsEnvelope size={20} />
      </button>
      <button type="button" className="sendRequest">
        <span>Üyelik talebi gönder</span>
        <IoPersonAddSharp size={20} />
      </button>
    </div>
  );
};

export default ClubEvent;
