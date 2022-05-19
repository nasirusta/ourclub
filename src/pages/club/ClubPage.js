import ClubHeader from "./ClubHeader";
import ClubRight from "./ClubRight";
import ClubLeft from "./ClubLeft";
import { TimeLine, SendPost, MobileFooter, UserRight } from "../../components";
import StickyHeader from "./StickyHeader";
import { useEffect, useState, Fragment } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
const clubsCollectionRef = collection(db, "clubs");

const ClubPage = () => {
  const windowWidth = useWindowWidth();
  const [clubState, setClub] = useState(false);
  let { club } = useParams();

  useEffect(() => {
    const q = query(clubsCollectionRef, where("clubURL", "==", club));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setClub({ recordID: doc.id, data: doc.data() });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [windowWidth]);

  return (
    <div className="flex flex-wrap w-full">
      {windowWidth > 767 && (
        <div className="w-1/4">
          <ClubLeft />
        </div>
      )}
      <div className="md:w-2/4 w-full ">
        {!clubState && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
            <ReactLoading
              type={"spin"}
              color="#1976d2"
              height={32}
              width={32}
            />
          </div>
        )}
        {clubState && (
          <Fragment>
            <StickyHeader name={clubState.data.name} />
            <ClubHeader club={clubState} />
            <SendPost />
            <TimeLine />
          </Fragment>
        )}
        {windowWidth < 768 && <MobileFooter />}
      </div>
      {windowWidth > 767 && (
        <div className="w-1/4 space-y-2">
          <ClubRight />
          <UserRight />
        </div>
      )}
    </div>
  );
};

export default ClubPage;
