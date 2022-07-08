import SingleComment from "./SingleComment";
import ReactLoading from "react-loading";

const PostComments = ({ commentData }) => {
  return (
    <div className="postComments">
      {commentData &&
        commentData.map((pComment, k) => (
          <SingleComment comment={pComment} key={k} />
        ))}
      {!commentData && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} height={32} width={32} color="#1976d2" />
        </div>
      )}
    </div>
  );
};

export default PostComments;
