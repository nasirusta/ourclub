import * as types from "../types";
import getSlug from "speakingurl";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
const clubsCollectionRef = collection(db, "clubs");

const createClubStart = () => ({
  type: types.CREATE_CLUB_START,
});

const createClubSuccess = (user) => ({
  type: types.CREATE_CLUB_SUCCESS,
  payload: user,
});

const createClubFail = (error) => ({
  type: types.CREATE_CLUB_FAIL,
  payload: error,
});

const editClubStart = () => ({
  type: types.EDIT_CLUB_START,
});

const editClubSuccess = (user) => ({
  type: types.EDIT_CLUB_SUCCESS,
  payload: user,
});

const editClubFail = (error) => ({
  type: types.EDIT_CLUB_FAIL,
  payload: error,
});

const createClub = (values, username, uid) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(createClubStart());

    let q = query(clubsCollectionRef, where("name", "==", values.name));

    const getRecordDoc = await getDocs(q);
    const record = getRecordDoc.docs.map((d) => {
      return d.data();
    });

    if (record.length === 0) {
      if (auth.currentUser) {
        const d = new Date();
        let info = {
          name: values.name,
          about: values.about,
          created: d.getTime(),
          modified: null,
          clubURL: getSlug(`${values.name}`, {
            lang: "tr",
            symbols: false,
            separator: "_",
          }),
        };
        addDoc(clubsCollectionRef, info).then(async (res) => {
          const rec_id = await GetRecordId(uid);
          const userDoc = doc(db, "users", rec_id[0].id);
          updateDoc(userDoc, {
            club: res.id,
          })
            .then(() => {
              dispatch(
                createClubSuccess(
                  Object.assign({}, auth.currentUser._delegate, {
                    username: username,
                    club: res.id,
                  })
                )
              );
              resolve(info);
            })
            .catch((error) => {
              dispatch(createClubFail(error));
              reject(false);
            });
        });
      } else {
        dispatch(createClubFail("Error"));
        reject(false);
      }
    } else {
      dispatch(createClubFail("error"));
      reject(
        `Bu kulüp (${values.name}) daha önce kuruldu. Lütfen başka bir kulüp adı girin.`
      );
    }
  });
};

const GetRecordId = async (uid) => {
  const q = query(clubsCollectionRef, where("uid", "==", uid));
  const getIdDoc = await getDocs(q);
  const ID = getIdDoc.docs.map((d) => {
    return { id: d.id };
  });

  return ID;
};

const editClubInitiate = (values, username, cid) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(editClubStart());

    let q = query(
      clubsCollectionRef,
      where("clubURL", "==", values.clubURL),
      where("id", "!=", cid)
    );

    const getRecordDoc = await getDocs(q);
    const record = getRecordDoc.docs.map((d) => {
      return d.data();
    });

    const docRef = doc(db, "clubs", cid);
    const docSnap = await getDoc(docRef);

    if (auth.currentUser) {
      if (docSnap.exists()) {
        if (record.length === 0) {
          const userDoc = doc(db, "clubs", cid);
          const d = new Date();
          let info = {
            about: values.about,
            timeposts: values.timeposts,
            modified: d.getTime(),
            clubURL: getSlug(`${values.clubURL}`, {
              lang: "tr",
              symbols: false,
              separator: "_",
            }),
          };
          updateDoc(userDoc, info)
            .then(() => {
              dispatch(
                editClubSuccess(
                  Object.assign({}, auth.currentUser._delegate, {
                    username: username,
                    club: cid,
                  })
                )
              );
              resolve(true);
            })
            .catch((error) => {
              dispatch(editClubFail(error));
              reject(false);
            });
        } else {
          dispatch(editClubFail("error"));
          reject(`Bu kulüp adresi (${values.clubURL}) daha önce kullanıldı.`);
        }
      } else {
        dispatch(editClubFail("error"));
        reject(false);
      }
    } else {
      dispatch(editClubFail("Error"));
      reject(false);
    }
  });
};

export { createClub, editClubInitiate };
