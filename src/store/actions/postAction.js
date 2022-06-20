import * as types from "../types";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const postsCollectionRef = collection(db, "posts");
const commentsCollectionRef = collection(db, "comments");

const getPostStart = () => ({
  type: types.GET_POST_START,
});

const getPostSuccess = (user) => ({
  type: types.GET_POST_SUCCESS,
  payload: user,
});

const getPostFail = (error) => ({
  type: types.GET_POST_FAIL,
  payload: error,
});

const getPostInit = (currentClub, subscribed_clubs) => async (dispatch) => {
  dispatch(getPostStart());

  let lastArray = [];
  let postObj = [];

  if (!currentClub) {
    if (subscribed_clubs.length > 0) {
      const clubMap = subscribed_clubs.map(async (row) => {
        const q = query(
          postsCollectionRef,
          orderBy("post_time", "desc"),
          where("clubID", "==", row.clubID)
        );
        const querySnapshot = await getDocs(q);
        const postMap = querySnapshot.docs.map(async (docN) => {
          return {
            postID: docN.id,
            post_time: docN.data().post_time,
            text: docN.data().text,
            club: docN.data().club,
            clubAvatar: docN.data().clubAvatar,
            clubID: docN.data().clubID,
            clubURL: docN.data().clubURL,
            user: docN.data().user,
          };
        });

        const resolved = await Promise.all(postMap);
        return resolved;
      });

      postObj = await Promise.all(clubMap);

      postObj.map((row) => {
        if (row.length > 0) {
          row.map((inside) => {
            lastArray.push(inside);
          });
        }
      });
    } else {
      postObj = [currentClub];
      lastArray = [currentClub.clubData.contents];
    }
  } else {
    postObj = [currentClub];
    lastArray = [currentClub.clubData.contents];
  }

  if (postObj.length > 0) {
    if (lastArray.length > 0) {
      if (currentClub) {
        if (currentClub.clubData.contents) {
          if (currentClub.clubData.contents.length > 0) {
            dispatch(getPostSuccess(currentClub.clubData.contents));
          } else {
            dispatch(getPostFail("Bu kulüpte henüz hiç paylaşım yok!"));
          }
        } else {
          dispatch(getPostFail("Bu kulüpte henüz hiç paylaşım yok!"));
        }
      } else {
        dispatch(getPostSuccess(lastArray));
      }
    } else {
      if (currentClub) {
        dispatch(getPostFail("Bu kulüpte henüz hiç paylaşım yok!"));
      } else {
        dispatch(getPostFail("Henüz hiç paylaşım yok!"));
      }
    }
  } else {
    dispatch(getPostFail("Henüz hiç bir kulübe üye olmadınız!"));
  }
};

const sendCommentRequest = async (values, postID, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const postDoc = doc(db, "posts", postID);
    const docSnap = await getDoc(postDoc);

    const docRef = doc(db, "users", currentUser.recordID);
    const userSnap = await getDoc(docRef);

    const d = new Date();
    const comment = {
      comment_time: d.getTime(),
      postID: postID,
      comment: values.comment,
      user: currentUser.recordID,
    };

    let postComments = !docSnap.data().comments ? [] : docSnap.data().comments;

    addDoc(commentsCollectionRef, comment)
      .then((last) => {
        comment.id = last.id;
        updateDoc(postDoc, {
          comments: [...postComments, comment],
        }).then(() => {
          getDoc(postDoc)
            .then((doc) => {
              resolve({ commetData: comment, user: userSnap.data() });
            })
            .catch((error) => {
              reject(false);
            });
        });
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
};

const commentLikeInit = (id, user) => {
  return new Promise(async (resolve, reject) => {
    const commentDoc = doc(db, "comments", id);
    const docSnap = await getDoc(commentDoc);

    let postLikes = !docSnap.data().likes ? [] : docSnap.data().likes;
    let postDisLikes = !docSnap.data().dis_likes
      ? []
      : docSnap.data().dis_likes;

    const d = new Date();
    const likeUser = {
      like_time: d.getTime(),
      user: user,
    };

    const filterLikes = postLikes.filter((row) => row.user === user);
    const filterDisLikes = postDisLikes.filter((row) => row.user !== user);
    let ctrlDisLike = !filterDisLikes ? [] : filterDisLikes;

    if (filterLikes.length === 0) {
      updateDoc(commentDoc, {
        likes: [...postLikes, likeUser],
        dis_likes: ctrlDisLike,
      })
        .then(() => {
          getDoc(commentDoc)
            .then((doc) => {
              resolve({
                likesCount: doc.data().likes.length,
                disLikesCount: doc.data().dis_likes.length,
              });
            })
            .catch(() => {
              reject(false);
            });
        })
        .catch(() => {
          reject(false);
        });
    } else {
      const disUser = postLikes.filter((row) => row.user !== user);
      let ctrlLike = !disUser ? [] : disUser;
      updateDoc(commentDoc, {
        likes: ctrlLike,
      })
        .then(() => {
          getDoc(commentDoc)
            .then((doc) => {
              resolve({
                likesCount: doc.data().likes.length,
                disLikesCount: doc.data().dis_likes.length,
              });
            })
            .catch(() => {
              reject(false);
            });
        })
        .catch(() => {
          reject(false);
        });
    }
  });
};

const commentDisLikInit = (id, user) => {
  return new Promise(async (resolve, reject) => {
    const commentDoc = doc(db, "comments", id);
    const docSnap = await getDoc(commentDoc);

    let postDisLikes = !docSnap.data().dis_likes
      ? []
      : docSnap.data().dis_likes;

    const d = new Date();
    const likeUser = {
      dis_like_time: d.getTime(),
      user: user,
    };

    const filterDisLikes = postDisLikes.filter((row) => row.user === user);
    const filterLikes = postDisLikes.filter((row) => row.user !== user);
    let ctrlLike = !filterLikes ? [] : filterLikes;

    if (filterDisLikes.length === 0) {
      updateDoc(commentDoc, {
        dis_likes: [...postDisLikes, likeUser],
        likes: ctrlLike,
      })
        .then(() => {
          getDoc(commentDoc)
            .then((doc) => {
              resolve({
                likesCount: doc.data().likes.length,
                disLikesCount: doc.data().dis_likes.length,
              });
            })
            .catch(() => {
              reject(false);
            });
        })
        .catch(() => {
          reject(false);
        });
    } else {
      const disUser2 = postDisLikes.filter((row) => row.user !== user);
      let ctrlDisLike = !disUser2 ? [] : disUser2;
      updateDoc(commentDoc, {
        dis_likes: ctrlDisLike,
      })
        .then(() => {
          getDoc(commentDoc)
            .then((doc) => {
              resolve({
                likesCount: doc.data().likes.length,
                disLikesCount: doc.data().dis_likes.length,
              });
            })
            .catch(() => {
              reject(false);
            });
        })
        .catch(() => {
          reject(false);
        });
    }
  });
};

export { getPostInit, sendCommentRequest, commentLikeInit, commentDisLikInit };
