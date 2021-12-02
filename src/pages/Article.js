import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse, { domToReact } from 'html-react-parser';

import SearchBar from "../components/SearchBar";
import LoaderContainer from "../components/LoaderContainer";

const initialLanguage = { code: "en", name: "English" };
function Article() {
  const [page, setPage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [languages, setLanguages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { articleKey } = useParams();

  const options = {
    replace: ({ name, children }) => {
      if (name && name === 'html') {
        return <>{domToReact(children, options)}</>;
      }
      if (name && name === 'body') {
        return <>{domToReact(children, options)}</>;
      }
      if (name && name === 'head') {
        return <></>;
      }
    },
    trim: true
  };


  useEffect(() => {
    setIsLoading(true);
    fetch(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/with_html`)
      .then(response => response.json())
      .then(data => {
        setPage(data.html);
        setIsLoading(false);
      })
  }, [currentLanguage])

  useEffect(() => {
    fetch(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/links/language`)
      .then(response => response.json())
      .then(data => {
        setLanguages(data)
      })
  }, [])

  const searchForArticleKey = (currentLanguage) => {
    console.log(currentLanguage, languages)
    if (currentLanguage.code === "en") {
      return articleKey
    }
    else {
      const language = languages.find(language => language.code === currentLanguage.code);
      return language.key
    }
  }

  const handleSearchLanguage = (e) => {
    if (e.key!=="Enter") return;
    const regExp = new RegExp(e.target.value, "i")
    setFilteredLanguages(languages.filter(lang => regExp.test(lang.code)))
  }

  const handleOnLanguageChange = (lang) => {
    setCurrentLanguage({ code: lang.code, name: lang.name })
  }

  const handleBackToEnglish = () => {
    setCurrentLanguage({ code: "en", name: "English" })
  }




  return (<div className="article">
    {isLoading && <LoaderContainer loaderMessage="Parsing HTML..."/>}
    {!isLoading && <>
      <section className="languages">
      <SearchBar>
        <input
        onKeyDown={handleSearchLanguage}
          type="text"
          className="search-input"
          placeholder="filter languages"
        />
      </SearchBar>
        <ul className="language-list">
          {filteredLanguages.map(lang => <li className="language" key={lang.code}><button onClick={() => handleOnLanguageChange(lang)}>{lang.name}</button></li>)}
        </ul>
        <div className="current-language">
        <p className="current-language-info">Current language: {currentLanguage.name}</p>
        {currentLanguage.code !== "en" && <button className="english-button" onClick={handleBackToEnglish}>Back to English Version</button>}
        </div>
      </section>
      <div style={container}>{parse(page, options)}</div></>}
  </div>
  )
}

export default Article;


const container = {
  padding: 20,
  fontSize: "16px",
  color: "black"
};