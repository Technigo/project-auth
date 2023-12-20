import styles from "../home/home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../../components/logo/Logo";
import down from "../../assets/icons/icons8-down-64.png";
import hero from "../../assets/images/bg.jpeg";
import half from "../../assets/images/half_circle.png";
import { Navbar } from "../../components/navbar/Navbar";
export const Home = () => {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.hero_text}>
          <div className={styles.text}>
            <h1>Your Weekly Dose of Fresh Florals:</h1>
            <p>
              “The splendour of a blossom lies in its graceful surrender to
              time.”
            </p>
            <p>“The beauty of a flower is that it will wither.”</p>

            <button type="button" className={styles.weekly}>
              Weekly Bouquet
            </button>
          </div>
        </div>
        <img src={half} alt="half circle image" className={styles.half} />
        <div className={styles.hero_img}>
          <img src={hero} alt="hero image" />
        </div>
      </section>
    </>
  );
};
