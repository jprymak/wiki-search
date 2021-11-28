import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse, { domToReact } from 'html-react-parser';
const initialLanguage = {code:"en", name: "English"};
function Article() {
  
  const [page, setPage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [languages, setLanguages] = useState(null);

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
    fetch(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/with_html`)
      .then(response => response.json())
      .then(data => {
        setPage(data.html)
      })
  }, [currentLanguage])

  useEffect(() => {
    fetch(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/links/language`)
      .then(response => response.json())
      .then(data => {
        setLanguages(data)
  console.log(data)
      })
  }, [])

  const searchForArticleKey = (currentLanguage) =>{
    console.log(currentLanguage, languages)
    if(currentLanguage.code === "en"){
      return articleKey
    }
    else{
      const language = languages.find(language=>language.code===currentLanguage.code);
      return language.key
    }
  }

  const handleSearchLanguage = (e) => {
    if(!e.target.value) return;
    const regExp = new RegExp(e.target.value, "i")
    setFilteredLanguages(languages.filter(lang =>regExp.test(lang.code)))
  }

  const handleOnLanguageChange=(lang)=>{
    setCurrentLanguage({code: lang.code, name: lang.name})
  }

  const handleBackToEnglish=()=>{
    setCurrentLanguage({code: "en", name: "English"})
  }




  return (<div className="article">
    <section className="languages">
      <form className="search-language">
        <input onChange={handleSearchLanguage} />
      </form>
      <ul className="language-list">
        {filteredLanguages.map(lang => <li className="language" key={lang.code}><button onClick={()=>handleOnLanguageChange(lang)}>{lang.name}</button></li>)}
      </ul>
      <p>{currentLanguage.name}</p>
      {currentLanguage.code!=="en" && <button onClick={handleBackToEnglish}>Back to English Version</button>}
    </section>
    {page && <div style={container}>{parse(page, options)}</div>}
  </div>
  )
}

export default Article;


const container = {
  padding: 20,
  fontSize: "16px",
  color: "black"
};