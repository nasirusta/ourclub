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
import { getPostInit } from "./postAction";
const clubsCollectionRef = collection(db, "clubs");
const postsCollectionRef = collection(db, "posts");

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

const GetRecordId = async (uid) => {
  const q = query(clubsCollectionRef, where("uid", "==", uid));
  const getIdDoc = await getDocs(q);
  const ID = getIdDoc.docs.map((d) => {
    return { id: d.id };
  });

  return ID;
};

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
          const userDoc = doc(db, "users", uid);
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

const currentClubContent = () => ({
  type: types.CURRENT_CLUB_CONTENT,
});

const currentClubStart = () => ({
  type: types.CURRENT_CLUB_START,
});

const currentClubFail = (error) => ({
  type: types.CURRENT_CLUB_FAIL,
  payload: error,
});

const currentClubSuccess = (club) => ({
  type: types.CURRENT_CLUB_SUCCESS,
  payload: club,
});

const currentClubInit = (club) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(currentClubStart());

    const q = query(clubsCollectionRef, where("clubURL", "==", club));
    const querySnapshot = await getDocs(q);
    let countC = [];
    querySnapshot.forEach((doc) => {
      countC.push({ clubID: doc.id, clubData: doc.data() });
      dispatch(currentClubSuccess({ clubID: doc.id, clubData: doc.data() }));
    });

    if (countC.length > 0) {
      resolve(true);
    } else {
      dispatch(currentClubFail("Club not found!"));
      reject(false);
    }
  });
};

const clubEditAvatar = (id, url) => (dispatch) => {
  dispatch(currentClubStart());

  if (auth.currentUser) {
    const userDoc = doc(db, "clubs", id);
    updateDoc(userDoc, {
      photoURL: url,
    }).then(() => {
      getDoc(userDoc)
        .then((doc) => {
          dispatch(
            currentClubSuccess({ clubID: doc.id, clubData: doc.data() })
          );
        })
        .catch((error) => {
          dispatch(currentClubFail(error));
        });
    });
  } else {
    dispatch(currentClubFail("Club avatar edit error!"));
  }
};

const clubDeleteAvatar = (id) => (dispatch) => {
  dispatch(currentClubStart());

  if (auth.currentUser) {
    const userDoc = doc(db, "clubs", id);
    updateDoc(userDoc, {
      photoURL: "",
    }).then(() => {
      getDoc(userDoc)
        .then((doc) => {
          dispatch(
            currentClubSuccess({ clubID: doc.id, clubData: doc.data() })
          );
        })
        .catch((error) => {
          dispatch(currentClubFail(error));
        });
    });
  } else {
    dispatch(currentClubFail("Club avatar delete error!"));
  }
};

const sendClubRequest = (subscribed_clubs, currentUser, data) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(currentClubStart());

    if (auth.currentUser) {
      const clubDoc = doc(db, "clubs", data.clubID);
      const userDoc = doc(db, "users", currentUser.recordID);
      let clubMembers = !data.clubData.members ? [] : data.clubData.members;

      const d = new Date();
      const reqUser = {
        username: currentUser.username,
        uid: currentUser.uid,
        subscribed_time: d.getTime(),
      };

      updateDoc(clubDoc, {
        members: [...clubMembers, reqUser],
      }).then(() => {
        getDoc(clubDoc)
          .then((doc) => {
            let clubAvatarOnj = !data.clubData.photoURL
              ? null
              : data.clubData.photoURL;

            const addClubObj = {
              clubName: data.clubData.name,
              clubURL: data.clubData.clubURL,
              clubAvatar: clubAvatarOnj,
              clubID: data.clubID,
              subscribed_time: d.getTime(),
              userRecordID: currentUser.recordID,
            };

            console.log("Mevcut: ", subscribed_clubs);

            updateDoc(userDoc, {
              subscribed_clubs: [...subscribed_clubs, addClubObj],
            }).then(() => {
              dispatch({
                type: types.SET_SUBSCRIBED_CLUB,
                payload: [...subscribed_clubs, addClubObj],
              });
              dispatch(
                currentClubSuccess({ clubID: doc.id, clubData: doc.data() })
              );
              resolve(true);
            });
          })
          .catch((error) => {
            reject(false);
            dispatch(currentClubFail(error));
          });
      });
    } else {
      reject(false);
      dispatch(currentClubFail("Send request error!"));
    }
  });
};

const clubDisFollow =
  (subscribed_clubsGet, currentUser, data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(currentClubStart());

      if (auth.currentUser) {
        const clubDoc = doc(db, "clubs", data.clubID);
        const userDoc = doc(db, "users", currentUser.recordID);

        const reqUser = data.clubData.members.filter(
          (row) => row.uid !== currentUser.uid
        );
        let getUser;
        if (reqUser.length < 1) {
          getUser = [];
        } else {
          getUser = [...data.clubData.members, reqUser];
        }

        updateDoc(clubDoc, {
          members: getUser,
        }).then(() => {
          getDoc(clubDoc)
            .then((doc) => {
              getDoc(userDoc).then((us) => {
                const disClubObj = subscribed_clubsGet.filter(
                  (row) => row.clubID !== data.clubID
                );

                updateDoc(userDoc, { subscribed_clubs: disClubObj }).then(
                  () => {
                    dispatch({
                      type: types.SET_SUBSCRIBED_CLUB,
                      payload: disClubObj,
                    });
                    dispatch(
                      currentClubSuccess({
                        clubID: doc.id,
                        clubData: doc.data(),
                      })
                    );
                    resolve(true);
                  }
                );
              });
            })
            .catch((error) => {
              reject(false);
              dispatch(currentClubFail("Burası"));
            });
        });
      } else {
        reject(false);
        dispatch(currentClubFail("Send request error!"));
      }
    });
  };

const sendContent = (values, club, currentUser) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(currentClubContent());

    if (auth.currentUser) {
      const userDoc = doc(db, "clubs", club.clubID);

      let clubAvatarOnj = !club.clubData.photoURL
        ? null
        : club.clubData.photoURL;

      const d = new Date();
      const post = {
        post_time: d.getTime(),
        text: values.text,
        clubID: club.clubID,
        club: club.clubData.name,
        clubAvatar: clubAvatarOnj,
        clubURL: club.clubData.clubURL,
        user: currentUser.uid,
      };

      let clubContents = !club.clubData.contents ? [] : club.clubData.contents;

      addDoc(postsCollectionRef, post)
        .then((last) => {
          post.postID = last.id;
          updateDoc(userDoc, {
            contents: [...clubContents, post],
          }).then(() => {
            getDoc(userDoc)
              .then((doc) => {
                const newData = { clubID: doc.id, clubData: doc.data() };
                dispatch(currentClubSuccess(newData));
                dispatch(getPostInit(newData));
                resolve(true);
              })
              .catch((error) => {
                reject(false);
                dispatch(currentClubFail(error));
              });
          });
        })
        .catch((error) => {
          dispatch(currentClubFail(error));
          reject(false);
        });
    } else {
      reject(false);
      dispatch(currentClubFail("Send request error!"));
    }
  });
};

export {
  createClub,
  editClubInitiate,
  currentClubInit,
  clubEditAvatar,
  clubDeleteAvatar,
  sendClubRequest,
  clubDisFollow,
  sendContent,
};
