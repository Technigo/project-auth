import styles from "./moreInfo.module.css";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import arrowDown from "../../assets/icons/icons8-down-64.png";
import flower from "../../assets/images/answer1.png";

export const MoreInfo = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [faqActive, setFaqActive] = useState(false);
  const { t } = useTranslation();

  const handleToggle = (section) => {
    switch (section) {
      case "about":
        setAboutActive(!aboutActive);
        break;
      case "delivery":
        setDeliveryActive(!deliveryActive);
        break;
      case "faq":
        setFaqActive(!faqActive);
        break;
      default:
        break;
    }
  };
  const renderMultilineText = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <section className={styles.more_info}>
      <h1 className={styles.title}>{t("moreInfo.title")}</h1>
      <div className={styles.question_container}>
        <div className={styles.question}>
          <h3 className={styles.q_title}>{t(`moreInfo.questions.0`)}</h3>
          <img
            type="button"
            onClick={() => handleToggle("about")}
            src={arrowDown}
            className={styles.arrow_down}
          ></img>
        </div>
        {aboutActive && (
          <>
            <p>{renderMultilineText(t("moreInfo.answers.0.about"))}</p>
            <img src={flower} alt="flowers" className={styles.flower} />
          </>
        )}
      </div>

      <div className={styles.question_container}>
        <div className={styles.question}>
          <h3 className={styles.q_title}>{t(`moreInfo.questions.1`)}</h3>
          <img
            type="button"
            onClick={() => handleToggle("delivery")}
            src={arrowDown}
            className={styles.arrow_down}
          ></img>
        </div>
        {deliveryActive && (
          <>
            <p>{renderMultilineText(t("moreInfo.answers.0.delivery"))}</p>
            <iframe
              width="100%"
              height="300"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=%20Sveav%C3%A4gen%20100,%20113%2050%20Stockholm+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/population/"></a>
            </iframe>
          </>
        )}
      </div>

      <div className={styles.question_container}>
        <div className={styles.question}>
          <h3 className={styles.q_title}>{t("moreInfo.questions.2")}</h3>
          <img
            type="button"
            onClick={() => handleToggle("faq")}
            src={arrowDown}
            className={styles.arrow_down}
          ></img>
        </div>
        {faqActive && (
          <>
            <div className={styles.wrapper}>
              <h3 className={styles.faq}>{t("moreInfo.answers.0.FAQ.0")}</h3>
              <p className={styles.answer}>
              {t("moreInfo.answers.0.FAQ_answer.0.cancellation")}
              </p>
            </div>
            <div className={styles.wrapper}>
              <h3 className={styles.faq}>{t("moreInfo.answers.0.FAQ.1")}</h3>
              <p className={styles.answer}>
              {t("moreInfo.answers.0.FAQ_answer.0.condition")}
              </p>
            </div>
            <div className={styles.wrapper}>
              <h3 className={styles.faq}>{t("moreInfo.answers.0.FAQ.2")}</h3>
              <p className={styles.answer}>
              {t("moreInfo.answers.0.FAQ_answer.0.holidays")}
              </p>
              <img src={flower} alt="flower image" className={styles.flower} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
