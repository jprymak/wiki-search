import { GiMagnifyingGlass } from "react-icons/gi";

function SearchBar({children}) {
  return (
    <form  onSubmit={(e)=>e.preventDefault()} className="search-bar">
      {children}
      <GiMagnifyingGlass/>
    </form>
  );
}

export default SearchBar;
