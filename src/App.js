import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {NavBar} from "./components/NavBar";
import SearchArticles from "./pages/SearchArticles";
import Article from "./pages/Article";
import History from "./pages/History";

import api from "./api/request";

import './App.css';

const storage = localStorage.getItem("wiki-search")

function App() {
  const [results, setResults] = useState([]);
  const [resultLimit] = useState(10);
  const [history, setHistory] = useState(()=> JSON.parse(storage) || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        setResults([])
        return
      }
      else {
        setIsLoading(true)
        api.get(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${e.target.value}&limit=${resultLimit}`)
          .then(data => {
            setResults(data.pages);
            const updatedHistory = [...history, ...data.pages];
            localStorage.setItem("wiki-search", JSON.stringify(updatedHistory))
            setHistory(updatedHistory);
            setIsLoading(false);
            e.target.value = "";
          })
      }
    }

  }

  const handleClearHistory = () =>{
    setHistory([])
    localStorage.setItem("wiki-search", JSON.stringify([]))
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/:articleKey" element={<Article />} />
        <Route path="/history" element={<History history={history} handleClearHistory={handleClearHistory}/>} />
        <Route path="/" element={<SearchArticles results={results} onSearch={handleSearch} isLoading={isLoading}/>} />
      </Routes>
    </div>
  );
}

export default App;

