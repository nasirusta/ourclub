import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../index";
import ReactLoading from "react-loading";

const TimeLine = () => {
  const [postList, setPostList] = useState([]);

  const getPostList = async () => {
    try {
      const response = await axios.get(
        "https://newsdata.io/api/1/news?apikey=pub_7195254a8e35b8c86dd59327155e638dbb2d&q=technology&category=science,technology,top,world",
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      setPostList(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="timeLine">
      {postList.length !== 0 &&
        postList.map((data, i) => <Post data={data} key={i} />)}
      {postList.length === 0 && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} height={32} width={32} color="#1976d2" />
        </div>
      )}
    </div>
  );
};

export default TimeLine;
