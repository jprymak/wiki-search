
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/">Home</Link> |{" "}
        <Link to="/search-articles">Search Articles</Link> | {" "}
        <Link to="/history">History</Link> | {" "}
      </nav>
    );
}

export default NavBar;