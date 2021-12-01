import { Link } from "react-router-dom";
import { GiMagnifyingGlass } from "react-icons/gi";

function NavBar() {
  return (
    <nav className="nav">
          <GiMagnifyingGlass />
          <h1 className="nav-app-name">Wiki-search</h1>
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search-articles">Search Articles</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
