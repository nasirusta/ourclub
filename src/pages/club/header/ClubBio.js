const ClubBio = ({ data }) => {
  return <div className="clubBio">{data.about && <h2>{data.about}</h2>}</div>;
};

export default ClubBio;
