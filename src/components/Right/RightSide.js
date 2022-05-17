import { useState, useEffect } from "react";
import RightMyClub from "./RightMyClub";
import SubscribededList from "./SubscribededList";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { userMemo } from "../../store/selector";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const RightSide = () => {
  const [clubData, setClub] = useState(false);
  const user = useSelector(userMemo);

  const getData = async () => {
    if (typeof user.currentUser.club !== "undefined") {
      const docRef = doc(db, "clubs", user.currentUser.club);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setClub({ recordID: docSnap.id, data: docSnap.data() });
      } else {
        setClub(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="right-side">
      {typeof user.currentUser.club !== "undefined" && (
        <div className="block w-full">
          {clubData && <RightMyClub data={clubData.data} />}
          {!clubData && (
            <div className="w-full flex flex-wrap items-center justify-center py-4">
              <ReactLoading
                type={"spin"}
                height={32}
                width={32}
                color="#1976d2"
              />
            </div>
          )}
        </div>
      )}
      <SubscribededList />
    </div>
  );
};

export default RightSide;
