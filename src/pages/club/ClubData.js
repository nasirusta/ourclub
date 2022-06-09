const ClubData = ({ data }) => {
  return (
    <div className="ClubData">
      <div className="box">
        {data.clubData.members && (
          <span className="title">{data.clubData.members.length}</span>
        )}
        {!data.clubData.members && <span className="title"> 0</span>}
        <span className="content">Üye</span>
      </div>
      <div className="box">
        {data.clubData.contents && (
          <span className="title">{data.clubData.contents.length}</span>
        )}
        {!data.clubData.contents && <span className="title"> 0</span>}
        <span className="content">Paylaşım</span>
      </div>
    </div>
  );
};

export default ClubData;
