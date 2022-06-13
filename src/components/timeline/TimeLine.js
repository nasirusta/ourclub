import { useEffect } from "react";
import { Post } from "../index";
import ReactLoading from "react-loading";
import { clubPageMemo, postMemo, userMemo } from "../../store/selector";
import { getPostInit } from "../../store/actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "evergreen-ui";

const TimeLine = () => {
  const { currentClub } = useSelector(clubPageMemo);
  const posts = useSelector(postMemo);
  const { subscribed_clubs } = useSelector(userMemo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostInit(currentClub, subscribed_clubs));
  }, []);

  return (
    <div className="timeLine">
      {!posts.loading &&
        posts.contents.map((data, i) => <Post data={data} key={i} />)}
      {posts.loading && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} height={32} width={32} color="#1976d2" />
        </div>
      )}
      {posts.error && (
        <div className="block p-3 shadow border border-gray-300 bg-white">
          <Alert intent="none" title={posts.error} />
        </div>
      )}
    </div>
  );
};

export default TimeLine;
