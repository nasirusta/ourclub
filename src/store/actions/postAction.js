import * as types from "../types";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
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

const getPostInit = (currentClub) => async (dispatch) => {
  dispatch(getPostStart());

  const q = query(postsCollectionRef);
  const querySnapshot = await getDocs(q);
  let postObj = querySnapshot.docs.map((docN) => {
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

  if (postObj.length > 0) {
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
      dispatch(getPostSuccess(postObj));
    }
  } else {
    if (currentClub) {
      dispatch(getPostFail("Bu kulüpte henüz hiç paylaşım yok!"));
    } else {
      dispatch(getPostFail("Henüz hiç paylaşım yok!"));
    }
  }
};

export { getPostInit };
