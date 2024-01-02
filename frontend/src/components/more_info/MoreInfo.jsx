import styles from "./moreInfo.module.css";
import data from "../../translation/english.json";
import React, { useState } from "react";
import arrowDown from "../../assets/icons/icons8-down-64.png";
import flower from "../../assets/images/answer1.png";

const info = data.moreInfo;
console.log(info.answers[0].image);
export const MoreInfo = () => {
  const [aboutActive, setAboutActive] = useState(false);
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [faqActive, setFaqActive] = useState(false);

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
    <div>
      <h1>{info.title}</h1>
      <div className={styles.question_about}>
        <h3>{info.questions[0]}</h3>
        <img
          type="button"
          onClick={() => handleToggle("about")}
          src={arrowDown}
        ></img>
        {aboutActive && (
          <>
            <p>{renderMultilineText(info.answers[0].about)}</p>
            <img src={flower} alt="flowers" />
          </>
        )}
      </div>

      <div className={styles.question_delivery}>
        <h3>{info.questions[1]}</h3>
        <img
          type="button"
          onClick={() => handleToggle("delivery")}
          src={arrowDown}
        ></img>
        {deliveryActive && (
          <>
            <p>{renderMultilineText(info.answers[0].delivery)}</p>
            <iframe
              width="100%"
              height="500"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=%20Sveav%C3%A4gen%20100,%20113%2050%20Stockholm+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/population/"></a>
            </iframe>
          </>
        )}
      </div>

      <div className={styles.question_faq}>
        <h3>{info.questions[2]}</h3>
        <img
          type="button"
          onClick={() => handleToggle("faq")}
          src={arrowDown}
        ></img>
        {faqActive && (
          <>
            <strong>{info.answers[0].FAQ[0]}</strong>
            <p>{info.answers[0].FAQ_answer[0].cancellation}</p>

            <strong>{info.answers[0].FAQ[1]}</strong>
            <p>{info.answers[0].FAQ_answer[0].condition}</p>

            <strong>{info.answers[0].FAQ[2]}</strong>
            <p>{info.answers[0].FAQ_answer[0].holidays}</p>
            <img src={flower} alt="flower image" />
          </>
        )}
      </div>
    </div>
  );
};
