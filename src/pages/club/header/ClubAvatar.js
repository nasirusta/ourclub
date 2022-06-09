import { useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../helper/UserHelper";
import { grey } from "@mui/material/colors";
import { MdPhotoCamera } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useWindowWidth } from "@react-hook/window-size";
import { useDispatch, useSelector } from "react-redux";
import { progInitiate } from "../../../store/actions/progressAction";
import { clubPageMemo } from "../../../store/selector";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import {
  clubEditAvatar,
  clubDeleteAvatar,
} from "../../../store/actions/clubAction";

const ClubAvatar = () => {
  const windowWidth = useWindowWidth();
  const { currentClub } = useSelector(clubPageMemo);
  const dispatch = useDispatch();
  const fileRef = useRef();

  const uploadPP = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/clubprofilepicture/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        dispatch(progInitiate(prog));
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          dispatch(clubEditAvatar(currentClub.clubID, url));
        });
      }
    );
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    uploadPP(file);
  };

  const clickUpload = () => {
    fileRef.current.click();
  };

  const deletePP = () => {
    const desertRef = ref(storage, currentClub.clubData.photoURL);
    deleteObject(desertRef)
      .then(() => {
        dispatch(clubDeleteAvatar(currentClub.clubID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [windowWidth]);

  return (
    <div className="clubAvatar">
      {typeof currentClub.clubData.photoURL !== "undefined" &&
        currentClub.clubData.photoURL !== "" && (
          <div className="flex flex-col items-center group">
            <div className="clubPhoto">
              {windowWidth > 767 && (
                <Avatar
                  src={currentClub.clubData.photoURL}
                  sx={{ width: 120, height: 120, bgcolor: grey[500] }}
                />
              )}
              {windowWidth < 767 && (
                <Avatar
                  src={currentClub.clubData.photoURL}
                  sx={{ width: 80, height: 80, bgcolor: grey[500] }}
                />
              )}
            </div>
            <div className="cAvatar-overlay">
              <button
                onClick={() => clickUpload()}
                type="butotn"
                className="editClubPhotoBtn"
              >
                <MdPhotoCamera size={20} />
              </button>
              <button
                onClick={() => deletePP()}
                type="butotn"
                className="editClubPhotoBtn"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </div>
        )}
      {typeof currentClub.clubData.photoURL !== "undefined" &&
        currentClub.clubData.photoURL === "" && (
          <div className="flex flex-col items-center group">
            <div className="clubPhoto">
              {windowWidth > 767 && (
                <Avatar
                  {...stringAvatar(
                    `${currentClub.clubData.name}Club`,
                    120,
                    120
                  )}
                />
              )}
              {windowWidth < 767 && (
                <Avatar
                  {...stringAvatar(`${currentClub.clubData.name}Club`, 80, 80)}
                />
              )}
            </div>
            <div className="cAvatar-overlay">
              <button
                onClick={() => clickUpload()}
                type="butotn"
                className="editClubPhotoBtn"
              >
                <MdPhotoCamera size={20} />
              </button>
            </div>
          </div>
        )}
      {typeof currentClub.clubData.photoURL === "undefined" && (
        <div className="flex flex-col items-center group">
          <div className="clubPhoto">
            {windowWidth > 767 && (
              <Avatar
                {...stringAvatar(`${currentClub.clubData.name}Club`, 120, 120)}
              />
            )}
            {windowWidth < 767 && (
              <Avatar
                {...stringAvatar(`${currentClub.clubData.name}Club`, 80, 80)}
              />
            )}
          </div>
          <div className="cAvatar-overlay">
            <button
              onClick={() => clickUpload()}
              type="butotn"
              className="editClubPhotoBtn"
            >
              <MdPhotoCamera size={20} />
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileRef}
        onChange={handleChange}
        multiple={false}
        type="file"
        hidden
      />
    </div>
  );
};

export default ClubAvatar;
