import parse from 'html-react-parser';
import{Link} from "react-router-dom";

import {LoaderContainer} from "../components/LoaderContainer";
import {SearchBar} from "../components/SearchBar";

import "./pages.css"

function SearchArticles({results, onSearch, isLoading }) {
  return (
    <div className="search-articles">
      <SearchBar>
        <input
        onKeyDown={onSearch}
          type="text"
          className="search-input"
          placeholder="Search for articles"
        />
      </SearchBar>
      {isLoading ? <LoaderContainer loaderMessage="Fetching data..."/> :
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
      </section>}
    </div>
  );
}

export default SearchArticles;
