import { useEffect, useState, Fragment, memo } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import SendComment from "./SendComment";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
const commentsCollectionRef = collection(db, "comments");

const Post = ({ data, currentUser }) => {
  const [commentList, setCommentList] = useState([]);
  const [noOfElement, setNoOfElement] = useState(2);
  const [isLiked, setIsLiked] = useState(false);

  const slice = commentList.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  const getCommentList = async () => {
    let q = query(
      commentsCollectionRef,
      orderBy("comment_time", "asc"),
      where("postID", "==", data.postID)
    );

    const getRecordDoc = await getDocs(q);
    const record = getRecordDoc.docs.map(async (d) => {
      const docRef = doc(db, "users", d.data().user);
      const docSnap = await getDoc(docRef);

      return {
        commetData: Object.assign({}, d.data(), { id: d.id }),
        user: docSnap.data(),
      };
    });
    const resolved = await Promise.all(record);
    setCommentList(resolved);
  };
  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div className="postData">
      <PostHeader
        name={data.club}
        avatar={data.clubAvatar}
        date={data.post_time}
        clubURL={data.clubURL}
      />
      <PostContent content={data.text} media={data.image_url} />
      <Fragment>
        <PostActions
          data={data}
          currentUser={currentUser}
          commentCount={commentList.length}
        />
        <SendComment
          postID={data.postID}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      </Fragment>
      <PostComments commentData={slice} />
      {noOfElement < commentList.length && (
        <button
          className="loadMoreComment"
          type="button"
          onClick={() => loadMore()}
        >
          Diğer yorumları göster ({commentList.length - noOfElement})
        </button>
      )}
    </div>
  );
};

export default memo(Post);
