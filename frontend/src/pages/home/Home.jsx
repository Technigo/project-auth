import styles from "../home/home.module.css";
import { Link } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
export const Home = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.navbar}>
          <ul>
            <Link to="/register" className={styles.linkContainer}>
              my account
            </Link>
            <Link to="/flowers" className={styles.linkContainer}>
              weekly bouquest
            </Link>
            <Link to="/login" className={styles.linkContainer}>
              <code></code>art
            </Link>
          </ul>
        </nav>
      </div>
    </section>
  );
};
