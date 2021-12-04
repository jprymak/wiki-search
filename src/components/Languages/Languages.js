import React from 'react';

import {SearchBar} from "../SearchBar";

import "./index.css";

function Languages({handleSearchLanguage, filteredLanguages, currentLanguage, handleBackToEnglish, handleOnLanguageChange}) {
    return (
        <section className="languages">
        <h2 className="languages-heading">Available languages</h2>
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
    );
}

export default Languages;