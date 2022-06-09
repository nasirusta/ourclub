import ClubHeader from "./ClubHeader";
import ClubRight from "./ClubRight";
import ClubLeft from "./ClubLeft";
import { TimeLine, SendPost, MobileFooter, UserRight } from "../../components";
import { useEffect, useState, Fragment } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentClubInit } from "../../store/actions/clubAction";

const ClubPage = () => {
  const windowWidth = useWindowWidth();
  const [loading, setLoading] = useState(true);
  const [currentClub, setCurrentClub] = useState(false);
  let { club } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentClubInit(club))
      .then(() => {
        setLoading(false);
        setCurrentClub(true);
      })
      .catch(() => {
        setLoading(false);
        setCurrentClub(false);
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
        {loading && (
          <div className="w-full flex flex-wrap items-center justify-center py-4">
            <ReactLoading
              type={"spin"}
              color="#1976d2"
              height={32}
              width={32}
            />
          </div>
        )}
        {!loading && (
          <Fragment>
            {currentClub && (
              <Fragment>
                <ClubHeader />
                <SendPost />
                <TimeLine />
              </Fragment>
            )}
            {!currentClub && (
              <div className="mx-6 my-4">
                <div className="block shadow-lg space-y-2 divide-y-2 p-4 border border-gray-300 bg-white">
                  <h1
                    className="block font-semibold uppercase text-gray-500"
                    lang="tr"
                  >
                    İçeriğe erişilemiyor
                  </h1>
                  <p className="block py-3 text-sm text-gray-500">
                    Böyle bir kulüp veya içerik yok
                    <a
                      href="/"
                      className="block max-w-max pt-2 underline text-blue-400"
                    >
                      Anasayfaya dön
                    </a>
                  </p>
                </div>
              </div>
            )}
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
