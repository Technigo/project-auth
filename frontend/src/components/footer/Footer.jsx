import { useState } from "react";
// import styles from "../footer/footer.module.css"

export const Footer = () => {
  const [bouquetMenuOpen, setbouquetMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const toggleBouquetMenu = () => {
    setbouquetMenuOpen(!bouquetMenuOpen);
  };
  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };
  return (
    <footer>
      <div>
        <ul>
          <li>
            Weekly bouquet
            <button onClick={toggleBouquetMenu}>
              <img
                src="../../../src/assets/icons/icons8-down-48.png"
                alt="scrolldown menu"
              />
            </button>
            <div>
              {bouquetMenuOpen && (
                <ul>
                  <li>Basic bouquet</li>
                  <li>Standard bouquet</li>
                  <li>Large bouquet</li>
                </ul>
              )}
            </div>
          </li>
          <li>Service</li>
          <li>Contact Us</li>
          <li>
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
                  <li>English</li>
                  <li>Swedish</li>
                </ul>
              )}
            </div>
          </li>
        </ul>
        <ul>
          <li>Opening hours:</li>
          <li>Monday-Friday: 9am- 5pm</li>
          <li>Saturday: 10am- 5pm</li>
          <li>Sunday: 11am- 5pm</li>
        </ul>
        <ul>
          <li>Contact Us</li>
          <div>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="../../../src/assets/icons/icons8-github-60.png"
                alt="github icon"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="../../../src/assets/icons/icons8-linkedin-50(1).png"
                alt="linkedin icon"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="../../../src/assets/icons/icons8-facebook-50.png"
                alt="facebook icon"
              />
            </a>
          </div>
        </ul>
      </div>
      <img
        src="../../../src/assets/icons/icons8-flower-64.png"
        alt="single tilted flower image"
      />
    </footer>
  );
};
