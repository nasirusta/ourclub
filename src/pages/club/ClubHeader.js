import ClubAvatar from "./header/ClubAvatar";
import ClubBio from "./header/ClubBio";
import ClubEvent from "./header/ClubEvent";

const ClubHeader = () => {
  return (
    <div className="clubHeader">
      <div className="cHeaderContainer">
        <div className="clubAvatar-div">
          <ClubAvatar />
        </div>
        <div className="clubMiddle">
          <ClubBio />
        </div>
        <div className="clubEvent">
          <ClubEvent />
        </div>
      </div> 
      <div className="clubLine">
        <div>
          <h1>Geceleri uyumayanların gündüzleri uyanamayanların kulübüsdfg</h1>
        </div>
        <div className=" text-sm">@geceleri_uyumayanlar_kulubu</div>
        <div className=" text-sm">Kurulma tarihi : 16 Mayıs 2022</div>
      </div>
    </div>
  );
};

export default ClubHeader;
