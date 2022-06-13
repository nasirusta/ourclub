import * as types from "../types";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
const postsCollectionRef = collection(db, "posts");

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
  if (subscribed_clubs) {
    const clubMap = subscribed_clubs.map(async (row) => {
      const q = query(postsCollectionRef, where("clubID", "==", row.clubID));
      const querySnapshot = await getDocs(q);
      const postMap = querySnapshot.docs.map(async (docN) => {
        return {
          postID: docN.id,
          post_time: docN.data().post_time,
          text: docN.data().text,
          club: docN.data().club,
          clubAvatar: docN.data().clubAvatar,
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
        dispatch(getPostFail("Bu kulüpte henüz hiç paylaşım yok2!"));
      } else {
        dispatch(getPostFail("Henüz hiç paylaşım yok!"));
      }
    }
  } else {
    dispatch(getPostFail("Henüz hiç bir kulübe üye olmadınız!"));
  }
};

export { getPostInit };
