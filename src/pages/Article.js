import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';


import {LoaderContainer} from "../components/LoaderContainer";
import {Languages} from "../components/Languages";
import { ParsedArticle } from "../components/ParsedArticle";

import api from "../api/request";
import { parseOptions } from "../utils/parsing";

const initialLanguage = { code: "en", name: "English" };

function Article() {
  const [page, setPage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [languages, setLanguages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { articleKey } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.get(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/with_html`)
      .then(data => {
        if(data){
          setPage(data.html);
          setIsLoading(false);
        }
      })
      .catch(error=>{
        console.log(error);
        setIsLoading(false);
      })
  }, [currentLanguage])

  useEffect(() => {
    api.get(`https://${currentLanguage.code}.wikipedia.org/w/rest.php/v1/page/${searchForArticleKey(currentLanguage)}/links/language`)
      .then(data => {
        if(data){
          setLanguages(data);
          setFilteredLanguages(data);
        }
      })
      .catch(error=>{console.log(error)})
  }, [])

  const searchForArticleKey = (currentLanguage) => {
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
      {languages ?  <Languages
      handleSearchLanguage={handleSearchLanguage}
      filteredLanguages={filteredLanguages}
      currentLanguage={currentLanguage}
      handleBackToEnglish={handleBackToEnglish}
      handleOnLanguageChange={handleOnLanguageChange}
      /> : <LoaderContainer loaderMessage="Fetching available languages..."/>}
      {isLoading && <LoaderContainer loaderMessage="Parsing HTML..."/>}
      {!isLoading && page && <ParsedArticle>{parse(page, parseOptions)}</ParsedArticle>}
  </div>
  )
}
export default Article;
