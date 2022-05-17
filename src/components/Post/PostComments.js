import SingleComment from "./SingleComment";

const PostComments = ({ commentData }) => {
  return (
    <div className="postComments">
      {commentData !== 0 &&
        commentData.map((pComment, k) => (
          <SingleComment comment={pComment} key={k} />
        ))}
    </div>
  );
};

export default PostComments;
