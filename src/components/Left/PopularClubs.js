import { Fragment, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
const clubsCollectionRef = collection(db, "clubs");

const PopularClubs = () => {
  const [popClub, setPopClub] = useState(false);
  const getPopularClubs = async () => {
    const q = query(clubsCollectionRef);
    const querySnapshot = await getDocs(q);
    let popObj = querySnapshot.docs.map((docN) => {
      return {
        name: docN.data().name,
        members: docN.data().members,
        url: docN.data().clubURL,
      };
    });
    if (popObj.length > 0) {
      setPopClub(popObj);
    } else {
      setPopClub([]);
    }
  };

  useEffect(() => {
    getPopularClubs();
  }, []);

  return (
    <div className="popular-clubs">
      <h1>Popüler Kulüpler</h1>
      {!popClub && (
        <div className="w-full flex flex-wrap items-center justify-center py-4">
          <ReactLoading type={"spin"} color="#1976d2" height={32} width={32} />
        </div>
      )}
      {popClub && (
        <Fragment>
          {popClub.length > 0 && (
            <ul>
              {popClub.map((row, index) => (
                <li key={index}>
                  <a href={row.url}>
                    - {row.name}
                    {row.members && <span>{row.members.length} Üye</span>}
                    {!row.members && <span>0 Üye</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {popClub.length < 1 && (
            <div className="block w-full overflow-hidden">
              <h3 className="inline-block max-w-max text-sm text-gray-500">
                Sisteme kayıtlı kulüp bulunamadı
              </h3>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default PopularClubs;
