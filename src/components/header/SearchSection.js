import { BsSearch } from "react-icons/bs";

const SearchSection = () => {
  return (
    <div className="search mx-auto px-3">
      <input type="text" name="search" placeholder="Herhangi bir içerik ara" />
      <button type="button">
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchSection;
