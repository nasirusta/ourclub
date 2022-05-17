import { useState } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../helper/UserHelper";
import { AiOutlineSend } from "react-icons/ai";

const SendPost = () => {
  const [clickField, setClick] = useState(false);
  const handleClick = () => {
    setClick(true);
  };

  const share = () => {
    return (
      <textarea name="post" placeholder="Birşeyler paylaş" autoFocus></textarea>
    );
  };

  const shareDisabled = () => {
    return <span>Birşeyler paylaş</span>;
  };

  return (
    <div className="sendPost">
      <div className="body">
        <div className="block">
          <Avatar {...stringAvatar("Ahmet Soysal", 50, 50)} />
        </div>
        <div
          className="postField"
          onClick={() => {
            handleClick();
          }}
        >
          {clickField ? share() : shareDisabled()}
        </div>
      </div>
      <div className="w-full flex flex-row-reverse my-2">
        {clickField ? (
          <button className="flex flex-wrap items-center bg-blue-500 px-4 py-1 rounded-lg text-center text-white">
            <span
              className="mr-1 h-full text-sm inline-block"
              onClick={() => alert("ok")}
            >
              Paylaş
            </span>
            <AiOutlineSend size={18} />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SendPost;
