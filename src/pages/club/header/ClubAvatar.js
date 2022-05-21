import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../helper/UserHelper";
import { grey } from "@mui/material/colors";
import { MdPhotoCamera } from "react-icons/md";
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
  const [ppPhoto, setPPphoto] = useState(data.photoURL);
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
          if (auth.currentUser) {
            const userDoc = doc(db, "clubs", recordID);
            updateDoc(userDoc, {
              photoURL: url,
            }).then(() => {
              console.log("ok");
              setPPphoto(url);
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
    const desertRef = ref(storage, data.photoURL);
    deleteObject(desertRef)
      .then(() => {
        if (auth.currentUser) {
          const userDoc = doc(db, "clubs", recordID);
          updateDoc(userDoc, {
            photoURL: "",
          }).then(() => {});
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, [ppPhoto]);

  return (
    <div className="clubAvatar">
      {typeof ppPhoto !== "undefined" && ppPhoto !== "" && (
        <div className="flex flex-col items-center">
          <div className="clubPhoto">
            <Avatar
              src={ppPhoto}
              sx={{ width: 120, height: 120, bgcolor: grey[500] ,objectFit:"fill"}}
            />
          </div>
          <button
            onClick={() => clickUpload()}
            type="butotn"
            className="editClubPhotoBtn"
          >
            <MdPhotoCamera size={24} />
          </button>
        </div>
      )}
      {typeof ppPhoto !== "undefined" && ppPhoto === "" && (
        <div className="flex flex-col items-center">
          <div className="clubPhoto">
            <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
          </div>
          <button
            onClick={() => clickUpload()}
            type="butotn"
            className="editClubPhotoBtn"
          >
            a
            <MdPhotoCamera size={24} />
          </button>
        </div>
      )}
      {typeof ppPhoto === "undefined" && (
        <div className="flex flex-col items-center">
          <div className="clubPhoto">
            <Avatar {...stringAvatar(`${data.name}Club`, 120, 120)} />
          </div>
          <button
            onClick={() => clickUpload()}
            type="butotn"
            className="editClubPhotoBtn"
          >
            b
            <MdPhotoCamera size={24} />
          </button>
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
