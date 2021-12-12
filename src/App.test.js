import {shallow} from "enzyme";
import App from './App';
import "./setupTests";


describe("App testing", ()=>{
  test('renders App component without crashing', () => {
   shallow(<App />);
  });
})
