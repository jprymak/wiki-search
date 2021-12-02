import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {RiDeleteBin2Line} from "react-icons/ri"

function History({ history, handleClearHistory }) {
    return (
        <div className="history">
            <section className="history-card">
                <header className="history-header"><h2 className="history-heading">Your Search History</h2> 
                <button onClick={handleClearHistory} className="clear-history-btn">Clear history <RiDeleteBin2Line/></button></header>
                <ul className="history-list">
                    {history.map(result => <li className="history-list-item" key={uuidv4()}><Link to={`/${result.key}`}>{result.key}</Link></li>)}
                </ul>
            </section>
        </div>
    );
}

export default History;