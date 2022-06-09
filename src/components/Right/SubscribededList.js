import { Fragment, useEffect, useState } from "react";
import ListLi from "./ListLi";
import ReactLoading from "react-loading";
import { userMemo } from "../../store/selector";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { collection, getDoc, query, doc } from "firebase/firestore";
const usersCollectionRef = collection(db, "users");

const SubscribededList = () => {
  const { currentUser } = useSelector(userMemo);
  const [subscribed, setSubscribed] = useState(false);

  const getSubClub = async () => {
    const docRef = doc(db, "users", currentUser.recordID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().subscribed_clubs) {
        if (docSnap.data().subscribed_clubs.length > 0) {
          setSubscribed(docSnap.data().subscribed_clubs);
        } else {
          setSubscribed([]);
        }
      } else {
        setSubscribed([]);
      }
    } else {
      setSubscribed([]);
    }
  };

  useEffect(() => {
    getSubClub();
  }, []);

  return (
    <div className="subscribededList">
      <h1>Üye Olduğunuz Kulüpler</h1>
      {!subscribed && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" height={32} width={32} />
        </div>
      )}
      {subscribed && (
        <Fragment>
          {subscribed.length > 0 && (
            <nav>
              {subscribed.map((data, i) => (
                <ListLi data={data} key={i} />
              ))}
            </nav>
          )}
          {subscribed.length < 1 && (
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
