import { useState, useEffect, Fragment } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../helper/UserHelper";
import { grey } from "@mui/material/colors";
import { MdPhotoCamera } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import ReactLoading from "react-loading";
import { useWindowWidth } from "@react-hook/window-size";
import { useDispatch } from "react-redux";
import { progInitiate } from "../../../store/actions/progressAction";
import { useRef } from "react";
import { storage, auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";

const ClubAvatar = ({ data, recordID }) => {
  const windowWidth = useWindowWidth();
  const [ppPhoto, setPPphoto] = useState(data.photoURL);
  const [avatarLoading, setLoading] = useState(false);
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
        setLoading(true);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (auth.currentUser) {
            const userDoc = doc(db, "clubs", recordID);
            updateDoc(userDoc, {
              photoURL: url,
            }).then(() => {
              setPPphoto(url);
              setLoading(false);
            });
          } else {
            console.log("Error");
          }
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
    setLoading(true);
    const desertRef = ref(storage, ppPhoto);
    deleteObject(desertRef)
      .then(() => {
        if (auth.currentUser) {
          const userDoc = doc(db, "clubs", recordID);
          updateDoc(userDoc, {
            photoURL: "",
          }).then(() => {
            setPPphoto("");
            setLoading(false);
          });
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [ppPhoto, windowWidth]);

  return (
    <div className="clubAvatar">
      {avatarLoading && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" height={32} width={32} />
        </div>
      )}
      {!avatarLoading && (
        <Fragment>
          {typeof ppPhoto !== "undefined" && ppPhoto !== "" && (
            <div className="flex flex-col items-center group">
              <div className="clubPhoto">
                {windowWidth > 767 && (
                  <Avatar
                    src={ppPhoto}
                    sx={{ width: 120, height: 120, bgcolor: grey[500] }}
                  />
                )}
                {windowWidth < 767 && (
                  <Avatar
                    src={ppPhoto}
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
          {typeof ppPhoto !== "undefined" && ppPhoto === "" && (
            <div className="flex flex-col items-center group">
              <div className="clubPhoto">
                {windowWidth > 767 && (
                  <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
                )}
                {windowWidth < 767 && (
                  <Avatar {...stringAvatar(`${data.name}Club`, 80, 80)} />
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
          {typeof ppPhoto === "undefined" && (
            <div className="flex flex-col items-center group">
              <div className="clubPhoto">
                {windowWidth > 767 && (
                  <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
                )}
                {windowWidth < 767 && (
                  <Avatar {...stringAvatar(`${data.name}Club`, 80, 80)} />
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
        </Fragment>
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
