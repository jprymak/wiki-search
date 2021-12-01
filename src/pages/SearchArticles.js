import parse from 'html-react-parser';
import{Link} from "react-router-dom";
function SearchArticles({results, onKeyDown }) {
  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()} className="search">
        <input
        onKeyDown={onKeyDown}
          type="text"
          className="search-input"
          placeholder="Search for articles"
        />
      </form>
      <section className="search-results">
          <ul className="result-list">
              {results && results.map(result=>
              <li className="result" key={result.id}>
                  <Link to={`/${result.key}`}><h3 className="result-title">{result.title}</h3></Link>
                  <p className="result-description">{result.description}</p>
                  <p className="result-excerpt">{parse(result.excerpt)}...</p>
                  {result.thumbnail && <img className="result-image" alt="" src={result.thumbnail.url}/>}
              </li>
              )}
          </ul>
      </section>
    </div>
  );
}

export default SearchArticles;
