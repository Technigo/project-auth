import styles from "./notfound.module.css";
import { Logo } from "../../components/logo/Logo";

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.textLogo}>
        <div className={styles.notFoundLogo}>
          <Logo />
        </div>
        <h1>404</h1>
      </div>
      <div className={styles.error}>
        <h3>Error</h3>
        <h3>Page not found</h3>
      </div>
    </div>
  );
};
