import styles from "../navbar/navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../../components/logo/Logo";
import down from "../../assets/icons/icons8-down-64.png";
import hamburgerIcon from "../../assets/icons/hamburger.png";
export const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        {/* mobile menu */}

        <nav className={styles.navbar}>
          <div>
            <img
              src={hamburgerIcon}
              alt="hamburger icon"
              className={styles.hamburgerIcon}
              onClick={toggleMobileMenu}
            />
            {showMobileMenu && (
              <div className={styles.mobile}>
                <li className={styles.flower}>
                  <span onClick={toggleOptions}>weekly bouquets</span>
                  <img
                    src={down}
                    alt="down arrow"
                    className={styles.down}
                    onClick={toggleOptions}
                  />
                  {showOptions && (
                    <ul className={styles.mobile_options}>
                      <li>
                        <Link to="/flowers/basic">Basic</Link>
                      </li>
                      <li>
                        <Link to="/flowers/standard">Standard</Link>
                      </li>
                      <li>
                        <Link to="/flowers/large">Large</Link>
                      </li>
                    </ul>
                  )}
                </li>

                <Link to="/register" className={styles.linkContainer}>
                  my account
                </Link>
                <Link to="/login" className={styles.linkContainer}>
                  cart
                </Link>
              </div>
            )}
          </div>

          {/* Desktop menu */}
          {/* {!showMobileMenu && ( */}
          <ul className={styles.ul}>
            <li className={styles.flower}>
              <span onClick={toggleOptions}>weekly bouquets</span>
              <img
                src={down}
                alt="down arrow"
                className={styles.down}
                onClick={toggleOptions}
              />
              {showOptions && (
                <ul className={styles.options}>
                  <li>
                    <Link to="/flowers/basic">Basic</Link>
                  </li>
                  <li>
                    <Link to="/flowers/standard">Standard</Link>
                  </li>
                  <li>
                    <Link to="/flowers/large">Large</Link>
                  </li>
                </ul>
              )}
            </li>

            <Link to="/register" className={styles.linkContainer}>
              my account
            </Link>
            <Link to="/login" className={styles.linkContainer}>
              cart
            </Link>
          </ul>
          {/* )} */}
        </nav>
      </div>
    </section>
  );
};
