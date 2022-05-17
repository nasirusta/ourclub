import ListLi from "./ListLi";

const SubscribededList = () => {
  return (
    <div className="subscribededList">
      <h1>Üye Olduğunuz Kulüpler</h1>
      <nav>
        <ListLi title={"Felsefe Kulübü"} />
        <ListLi title={"Matematik Kulübü"} />
        <ListLi title={"Sanat Kulübü"} />
        <ListLi title={"Bilişim ve Teknoloji Kulübü"} />
        <ListLi title={"Mimarlık Kulübü"} />
        <ListLi title={"Geceleri Uyuyamayanlar Kulübü"} />
      </nav>
    </div>
  );
};

export default SubscribededList;
