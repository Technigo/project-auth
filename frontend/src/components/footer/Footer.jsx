import { useState } from "react";
import { Link } from "react-router-dom";
import { Translate } from "../../pages/Translate";
import { useTranslation } from "react-i18next";
import footerFlowerIcon from "../../assets/icons/icons8-flower-64.svg";
import styles from "../footer/footer.module.css";
import down from "../../assets/icons/icons8-down-48.png";
import github from "../../assets/icons/icons8-github-60.png";
import facebook from "../../assets/icons/icons8-facebook-50.png";
import linkedin from "../../assets/icons/icons8-linkedin-50(1).png";

export const Footer = () => {
  const { t } = useTranslation(); // Add useTranslation() function to access 't' function
  const [bouquetMenuOpen, setbouquetMenuOpen] = useState(false);
  const toggleBouquetMenu = () => {
    setbouquetMenuOpen(!bouquetMenuOpen);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerFlex}>
        <ul>
          <li>
            {t("footer.weeklyBouquet")}
            <button onClick={toggleBouquetMenu} className={styles.footerButton}>
              <img src={down} alt="scrolldown menu" />
            </button>
            <div>
              {bouquetMenuOpen && (
                <ul>
                  <li className={styles.footerScroll}>
                    <Link to="/flowers/basic" className={styles.bouquetLink}>
                      {t("bouquetType.basic")}
                    </Link>
                  </li>
                  <li className={styles.footerScroll}>
                    <Link to="/flowers/standard" className={styles.bouquetLink}>
                      {t("bouquetType.standard")}
                    </Link>
                  </li>
                  <li className={styles.footerScroll}>
                    <Link to="/flowers/large" className={styles.bouquetLink}>
                      {t("bouquetType.large")}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>{t("footer.service")}</li>
          <li>
            <Translate />
          </li>
        </ul>
        <ul>
          <li>{t("footer.openingHours")}</li>
          <li>{t("footer.mondayFriday")}</li>
          <li>{t("footer.saturday")}</li>
          <li>{t("footer.sunday")}</li>
        </ul>
        <ul className={styles.footerContact}>
          <li>{t("footer.contactUs")}</li>
          <div className={styles.footerIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="github icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="linkedin icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="facebook icon" />
            </a>
          </div>
        </ul>
      </div>
      <div className={styles.footerFlower}>
        <img src={footerFlowerIcon} alt="single tilted flower image" />
      </div>
    </footer>
  );
};
