import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../components/footer/footer.module.css";
import down from "../assets/icons/icons8-down-48.png";
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
      {t("footer.language")}
      <button onClick={toggleLanguageMenu} className={styles.footerButton}>
        <img src={down} alt="scrolldown menu" />
      </button>
      <div>
        {languageMenuOpen && (
          <ul>
            <li
              type="button"
              onClick={englishFunc}
              className={styles.footerScroll}
            >
              {t("footer.english")}
            </li>
            <li
              type="button"
              onClick={swedishFunc}
              className={styles.footerScroll}
            >
              {t("footer.swedish")}
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
