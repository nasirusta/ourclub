import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostComments from "./PostComments";
import SendComment from "./SendComment";

const Post = ({ data }) => {
  const [commentList, setCommentList] = useState([]);
  const [noOfElement, setNoOfElement] = useState(2);

  const slice = commentList.slice(0, noOfElement);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  const getCommentList = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1/comments",
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      setCommentList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <Fragment>
      <div className="postData">
        <PostHeader
          name={data.club}
          avatar={data.clubAvatar}
          date={data.post_time}
          clubURL={data.clubURL}
        />
        <PostContent content={data.content} media={data.image_url} />
        <Fragment>
          <PostActions />
          <SendComment />
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
    </Fragment>
  );
};

export default Post;
