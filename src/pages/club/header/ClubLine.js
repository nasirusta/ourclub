import { BsCalendarCheck } from "react-icons/bs";

const ClubLine = () => {
  return (
    <div className="clubLine">
      <div className="name">
        <h1>Geceleri uyumayanların gündüzleri uyanamayanların kulübüsdfg</h1>
      </div>
      <div className="clubUrl">@geceleri_uyumayanlar_kulubu</div>
      <div className="createDate">
        <span>16 Mayıs 2022</span>
        <span>
          <BsCalendarCheck />
        </span>
      </div>
    </div>
  );
};

export default ClubLine;
