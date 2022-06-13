import { Fragment } from "react";
import ListLi from "./ListLi";
import ReactLoading from "react-loading";
import { userMemo } from "../../store/selector";
import { useSelector } from "react-redux";

const SubscribededList = () => {
  const { subscribed_clubs } = useSelector(userMemo);

  return (
    <div className="subscribededList">
      <h1>Üye Olduğunuz Kulüpler</h1>
      {!subscribed_clubs && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" height={32} width={32} />
        </div>
      )}
      {subscribed_clubs && (
        <Fragment>
          {subscribed_clubs.length > 0 && (
            <nav>
              {subscribed_clubs.map((data, i) => (
                <ListLi data={data} key={i} />
              ))}
            </nav>
          )}
          {subscribed_clubs.length < 1 && (
            <h2 className="inline-block max-w-max text-sm text-gray-500">
              Henüz hiçbir kulübe üye olmadınız
            </h2>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default SubscribededList;
