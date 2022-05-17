import { FaEnvelope } from "react-icons/fa";

const OtherProfile = ({ displayName, photoURL }) => {
  return (
    <div className="ProfileContainer">
      {photoURL === null && (
        <img
          className="ProfileAvatarP"
          src={"../../../img/noavatar.jpg"}
          alt={displayName}
        />
      )}
      {photoURL !== null && (
        <img className="ProfileAvatarP" src={`${photoURL}`} alt={displayName} />
      )}
      <div className="text-center mt-2 text-3xl font-medium">{displayName}</div>
      <div className="flex flex-wrap justify-center items-center w-full py-2 my-1 space-x-6">
        <button
          className="block py-1 px-8 h-9 shadow font-bold text-sm bg-opacity-90
  bg-[#1862cf] border-slate-300 text-white"
        >
          Arkadaş Ol
        </button>
        <button
          className="block py-1 px-8 h-9 shadow font-bold
  bg-[#1862cf] text-white border-slate-300"
        >
          <FaEnvelope size={22} />
        </button>
      </div>
      <div className="flex flex-wrap p-4 shadow bg-black bg-opacity-10 divide-x divide-gray-400">
        <div className="w-1/2 text-center">
          <span className="font-bold">1.8 k</span> Kulüp
        </div>
        <div className="w-1/2 text-center">
          <span className="font-bold">2.0 k</span> Paylaşım
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
