import * as types from "../types";
import getSlug from "speakingurl";
import { auth, db } from "../../firebase";
import {
  updateProfile,
  updateEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
const usersCollectionRef = collection(db, "users");

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

const profileEditStart = () => ({
  type: types.PROFILE_EDIT_START,
});

const profileEditSuccess = (user) => ({
  type: types.PROFILE_EDIT_SUCCESS,
  payload: user,
});

const profileEditFail = (error) => ({
  type: types.PROFILE_EDIT_FAIL,
  payload: error,
});

const registerInitiate = (email, password, displayName) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          .updateProfile({
            displayName,
          })
          .then(() => {
            let randomNumb = Math.floor(Math.random() * 10001);
            let info = {
              uid: user._delegate.uid,
              username: getSlug(`${displayName}${randomNumb}`, {
                lang: "tr",
                symbols: false,
              }),
              name: displayName,
              mail: email,
              photoURL: null,
            };
            addDoc(usersCollectionRef, info).then((last) => {
              info.recordI = last.id;
              dispatch(
                registerSuccess(Object.assign({}, user._delegate, info))
              );
              resolve(true);
            });
          });
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
        reject(false);
      });
  });
};

const loginInitiate = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const q = query(usersCollectionRef, where("mail", "==", email));

        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              dispatch(
                loginSuccess(
                  Object.assign({}, user._delegate, {
                    username: doc.data().username,
                    club: doc.data().club,
                    recordID: doc.id,
                  })
                )
              );
              resolve(true);
            });
          })
          .catch((error) => {
            dispatch(loginFail(error));
            reject(false);
          });
      })
      .catch((error) => {
        dispatch(loginFail(error.message));
        reject(false);
      });
  });
};

const logoutInitiate = () => (dispatch) => {
  dispatch(logoutStart());
  auth
    .signOut()
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((error) => {
      dispatch(logoutFail(error.message));
    });
};

const GetRecordId = async (uid) => {
  const q = query(usersCollectionRef, where("uid", "==", uid));
  const getIdDoc = await getDocs(q);
  const ID = getIdDoc.docs.map((d) => {
    return { id: d.id };
  });

  return ID;
};

const profileEditInitiate = (name, username, activeUD) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(profileEditStart());

    let q = query(
      usersCollectionRef,
      where("username", "==", username),
      where("uid", "!=", activeUD)
    );
    const getRecordDoc = await getDocs(q);
    const record = getRecordDoc.docs.map((d) => {
      return d.data();
    });

    if (record.length === 0) {
      GetRecordId(activeUD).then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            if (auth.currentUser) {
              const userDoc = doc(db, "users", res[0].id);
              updateDoc(userDoc, {
                name: name,
                username: username,
              }).then(() => {
                dispatch(
                  profileEditSuccess(
                    Object.assign({}, auth.currentUser._delegate, {
                      username: username,
                    })
                  )
                );
                resolve(true);
              });
            } else {
              dispatch(profileEditFail("Error"));
              reject(false);
            }
          })
          .catch((error) => {
            dispatch(profileEditFail(error));
            reject(false);
          });
      });
    } else {
      dispatch(profileEditFail("error"));
      reject(
        `Bu kullanıcı adı kullanılıyor ${username}. Lütfen başka bir kulanıcı adı deneyin.`
      );
    }
  });
};

const emailEditInitiate = (email, username, activeUD) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(profileEditStart());

    let q = query(
      usersCollectionRef,
      where("mail", "==", email),
      where("uid", "!=", activeUD)
    );
    const getRecordDoc = await getDocs(q);
    const record = getRecordDoc.docs.map((d) => {
      return d.data();
    });

    if (record.length === 0) {
      GetRecordId(activeUD).then((res) => {
        updateEmail(auth.currentUser, email)
          .then(() => {
            if (auth.currentUser) {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  const userDoc = doc(db, "users", res[0].id);
                  updateDoc(userDoc, {
                    mail: email,
                  }).then(() => {
                    dispatch(
                      profileEditSuccess(
                        Object.assign({}, auth.currentUser._delegate, {
                          username: username,
                        })
                      )
                    );
                    resolve(true);
                  });
                })
                .catch((error) => {
                  dispatch(profileEditFail(error));
                  reject(false);
                });
            } else {
              dispatch(profileEditFail("Error"));
              reject(false);
            }
          })
          .catch((error) => {
            dispatch(profileEditFail(error));
            reject(false);
          });
      });
    } else {
      dispatch(profileEditFail("error"));
      reject(
        `Bu mail adresi kullanılıyor ${email}. Lütfen başka bir mail adresi deneyin.`
      );
    }
  });
};

const passwordEditInitiate = (username, newPassword) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch(profileEditStart());

    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              dispatch(
                profileEditSuccess(
                  Object.assign({}, auth.currentUser._delegate, {
                    username: username,
                  })
                )
              );
              resolve(true);
            })
            .catch((error) => {
              dispatch(profileEditFail(error));
              reject(false);
            });
        } else {
          dispatch(profileEditFail("Error"));
          reject(false);
        }
      })
      .catch((error) => {
        dispatch(profileEditFail(error));
        reject(false);
      });
  });
};

export {
  registerInitiate,
  loginInitiate,
  logoutInitiate,
  loginStart,
  loginSuccess,
  profileEditInitiate,
  emailEditInitiate,
  passwordEditInitiate,
  GetRecordId,
};
