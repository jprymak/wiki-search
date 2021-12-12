import {shallow} from "enzyme";
import App from './App';
import "./setupTests";

test('renders App component', () => {
  shallow(<App />);
});
