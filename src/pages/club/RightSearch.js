import { BsSearch } from "react-icons/bs";

const RightSearch = () => {
  return (
    <div className="ClubRight">
      <div className="ClubSearch">
        <input
          type="text"
          name="search"
          placeholder="Herhangi bir içerik ara"
        />
        <button type="button">
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default RightSearch;
