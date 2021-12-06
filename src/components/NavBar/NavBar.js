import { Link } from "react-router-dom";
import { GiMagnifyingGlass } from "react-icons/gi";

import "./index.css";

import {links} from "data/links";

function NavBar() {
  return (
    <nav className="nav">
          <GiMagnifyingGlass />
          <h1 className="nav-app-name">Wiki-search</h1>
      <ul className="nav-list">
        {links.map(link=><li key={link.id}><Link to={link.url}>{link.page}</Link></li>)}
      </ul>
    </nav>
  );
}

export default NavBar;
