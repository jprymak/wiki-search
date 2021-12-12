import { shallow } from "enzyme";
import { GiMagnifyingGlass } from "react-icons/gi";
import { Link } from "react-router-dom";
import { links } from "data/links"
import NavBar from './NavBar';
import "setupTests";

describe("NavBar testing", () => {
    test('renders NavBar component without crashing', () => {
        shallow(<NavBar />);
    });
    test('renders a list of links', () => {
        const wrapper = shallow(<NavBar />);
        const list = (<ul className="nav-list">
            {links.map(link => <li key={link.id}><Link to={link.url}>{link.page}</Link></li>)}
        </ul>)
        expect(wrapper.contains(list)).toEqual(true);
    });
    test('renders logo and app title', () => {
        const wrapper = shallow(<NavBar />);
        const logo = (<GiMagnifyingGlass/>);
        const appTitle = (<h1 className="nav-app-name">Wiki-search</h1>)
        expect(wrapper.contains(logo, appTitle)).toEqual(true);
    });
})