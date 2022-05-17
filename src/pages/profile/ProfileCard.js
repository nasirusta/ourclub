import { userMemo } from "../../store/selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { db } from "../../firebase";
import MyprofileCard from "./MyprofileCard";
import OtherProfile from "./OtherProfile";
import { collection, getDocs, query, where } from "firebase/firestore";
const usersCollectionRef = collection(db, "users");

const ProfileCard = () => {
  const [userState, setUser] = useState(false);
  const user = useSelector(userMemo);
  let { userId } = useParams();

  useEffect(() => {
    const q = query(usersCollectionRef, where("username", "==", userId));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser({ recordID: doc.id, data: doc.data() });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ProfilePage">
      {!userId === user.currentUser.username && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" />
        </div>
      )}
      {userId === user.currentUser.username &&
        userId === user.currentUser.username && (
          <MyprofileCard
            displayName={user.currentUser.displayName}
            photoURL={user.currentUser.providerData[0]?.photoURL}
            username={user.currentUser.username}
            recordID={userState?.recordID}
          />
        )}
      {!userState && <ReactLoading type={"spin"} color="#1976d2" />}
      {userState && userId !== user.currentUser.username && (
        <OtherProfile
          displayName={userState.data.name}
          photoURL={userState.data.photoURL}
        />
      )}
    </div>
  );
};

export default ProfileCard;
