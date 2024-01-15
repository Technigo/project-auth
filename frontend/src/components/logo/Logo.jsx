import styles from "../logo/logo.module.css";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      FloraEcho
    </Link>
  );
};
