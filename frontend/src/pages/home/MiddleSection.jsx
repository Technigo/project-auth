import styles from "../home/middleSection.module.css";
import basic from "../../assets/images/flower1.png";
import standard from "../../assets/images/flower2.png";
import large from "../../assets/images/flower3.png";
import arrow from "../../assets/icons/right-arrow.png";
import { useNavigate } from "react-router-dom";
export const MiddleSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.middle}>
      <div className={styles.greenBg}></div>

      <div className={styles.flowers}>
        <img src={basic} alt="Basic image" className={styles.image} />
        <div className={styles.box}>
          <h3>Basic</h3>
          <img
            src={arrow}
            alt="right arrow"
            className={styles.arrow}
            aria-label="button"
            onClick={() => navigate("/flowers/basic")}
          />
        </div>
      </div>
      <div className={styles.flowers}>
        <img src={standard} alt="Standard image" />
        <div className={styles.box}>
          <h3>Standard</h3>
          <img
            src={arrow}
            alt="right arrow"
            className={styles.arrow}
            aria-label="button"
            onClick={() => navigate("/flowers/standard")}
          />
        </div>
      </div>
      <div className={styles.flowers}>
        <img src={large} alt="Large image" />
        <div className={styles.box}>
          <h3>Large</h3>
          <img
            src={arrow}
            alt="right arrow"
            className={styles.arrow}
            aria-label="button"
            onClick={() => navigate("/flowers/large")}
          />
        </div>
      </div>
    </section>
  );
};
