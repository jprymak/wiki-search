import {Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

function History({history}) {
    return (
        <div>
          <ul>
              {history.map(result=><li key={uuidv4()}><Link to={`/${result.key}`}>{result.key}</Link></li>)}
          </ul>
        </div>
    );
}

export default History;