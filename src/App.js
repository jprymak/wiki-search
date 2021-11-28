import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SearchArticles from "./pages/SearchArticles";
import Article from "./pages/Article";
import History from "./pages/History";

import api from "./api/request"

import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [resultLimit] = useState(5);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        setResults([])
        return
      }
      else {
        api.get(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${e.target.value}&limit=${resultLimit}`)
          .then(data => {
            setResults(data.pages)
          })
      }
    }

  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/search-articles" element={<SearchArticles results={results} onKeyDown={handleOnKeyDown} />} />
        <Route path="/:articleKey" element={<Article />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

