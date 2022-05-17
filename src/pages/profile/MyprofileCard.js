import { MdSettings } from "react-icons/md";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { useState, useRef } from "react";
import { storage, auth, db } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { updateProfile } from "firebase/auth";
import { loginStart, loginSuccess } from "../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import ProgressBar from "@ramonak/react-progress-bar";
import ReactLoading from "react-loading";
import { userMemo } from "../../store/selector";

const MyprofileCard = ({ displayName, photoURL, username, recordID }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const fileRef = useRef();
  const loadingState = useSelector(userMemo);

  const uploadPP = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/profilepictures/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        dispatch(loginStart());
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateProfile(auth.currentUser, {
            photoURL: url,
          })
            .then(() => {
              if (auth.currentUser) {
                const userDoc = doc(db, "users", recordID);
                updateDoc(userDoc, {
                  photoURL: url,
                }).then(() => {
                  dispatch(
                    loginSuccess(
                      Object.assign({}, auth.currentUser._delegate, {
                        username: username,
                      })
                    )
                  );
                });
              } else {
                console.log("Error");
              }
            })
            .catch((error) => {
              console.log(error);
            });
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
    const desertRef = ref(storage, photoURL);
    deleteObject(desertRef)
      .then(() => {
        updateProfile(auth.currentUser, {
          photoURL: "",
        })
          .then(() => {
            if (auth.currentUser) {
              const userDoc = doc(db, "users", recordID);
              updateDoc(userDoc, {
                photoURL: "",
              }).then(() => {
                dispatch(
                  loginSuccess(
                    Object.assign({}, auth.currentUser._delegate, {
                      username: username,
                    })
                  )
                );
              });
            } else {
              console.log("Error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ProfileContainer">
      {photoURL === null && (
        <div className="w-full flex flex-col items-center">
          <div className="block">
            {!loadingState.loading && (
              <img
                className="ProfileAvatarP"
                src={"../../../img/noavatar.jpg"}
                alt={displayName}
              />
            )}
            {loadingState.loading && (
              <ReactLoading type={"spin"} color="#1976d2" />
            )}
          </div>
          <div className="-mt-4">
            <button
              onClick={() => clickUpload()}
              className="p-2 rounded-full border
            border-gray-400 text-black bg-gray-200 hover:bg-opacity-50"
            >
              <FiEdit size={19} />
            </button>
            <input
              ref={fileRef}
              onChange={handleChange}
              multiple={false}
              type="file"
              hidden
            />
          </div>
          <div className="w-full px-8 my-2">
            {loadingState.loading && <ProgressBar completed={progress} />}
          </div>
        </div>
      )}
      {photoURL !== null && (
        <div className="w-full flex flex-col items-center">
          <div className="block">
            {!loadingState.loading && (
              <img
                className="ProfileAvatarP"
                src={`${photoURL}`}
                alt={displayName}
              />
            )}
            {loadingState.loading && (
              <ReactLoading type={"spin"} color="#1976d2" />
            )}
          </div>
          <div className="-mt-4 flex flex-wrap space-x-2">
            <button
              onClick={() => clickUpload()}
              className="p-2 rounded-full border
            border-gray-400 text-black bg-gray-200 hover:bg-opacity-50"
            >
              <FiEdit size={19} />
            </button>
            <button
              onClick={() => deletePP()}
              className="p-2 rounded-full border
            border-gray-400 text-black bg-gray-200 hover:bg-opacity-50"
            >
              <FiXOctagon size={19} />
            </button>
            <input
              ref={fileRef}
              onChange={handleChange}
              multiple={false}
              type="file"
              hidden
            />
          </div>
          <div className="w-full px-8 my-2">
            {loadingState.loading && <ProgressBar completed={progress} />}
          </div>
        </div>
      )}
      <div className="text-center mt-2 text-3xl font-medium">{displayName}</div>
      <div className="flex flex-wrap justify-center items-center w-full py-2 my-1 space-x-6">
        <a
          href={`/profile-edit`}
          className="flex items-center py-1 px-8 h-9 shadow font-bold space-x-4
      bg-[#1862cf] text-white border-slate-300"
        >
          <span>Profilini düzenle</span>
          <MdSettings size={24} />
        </a>
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

export default MyprofileCard;
