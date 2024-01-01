import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Translate = () => {
  //Defining via destructured variable, 2 methods from useTranslation
  const { t, i18n } = useTranslation();

  //Function to change languages
  const changeLanguageFunc = (lng) => {
    i18n.changeLanguage(lng);
  };

  const englishFunc = () => changeLanguageFunc("en");
  const swedishFunc = () => changeLanguageFunc("se");

  // Toggling language scrolldown menu
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  return (
    <>
      Language
      <button onClick={toggleLanguageMenu}>
        <img
          src="../../../src/assets/icons/icons8-down-48.png"
          alt="scrolldown menu"
        />
      </button>
      <div>
        {languageMenuOpen && (
          <ul>
            <li type="button" onClick={englishFunc}>
              English
            </li>
            <li type="button" onClick={swedishFunc}>
              Swedish
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
