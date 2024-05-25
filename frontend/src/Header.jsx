import { Button } from "./Components/Button";
import logo from "/crypTech.svg";
import PropTypes from "prop-types";

import "./Header.css";

export const Header = ({
  setFormSelect,
  setIsRegistered,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  return (
    <section className="navigation">
      <div id="crypTech">
        <img id="logo" src={logo} alt="crypTech" />
        <h1>crypTech</h1>
      </div>
      <div className="buttons">
        {isLoggedIn ? (
          <Button
            action="Log Out"
            setFormSelect={setFormSelect}
            setIsRegistered={setIsRegistered}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <>
            <Button
              action="Sign Up"
              setFormSelect={setFormSelect}
              setIsRegistered={setIsRegistered}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Button
              action="Log In"
              setFormSelect={setFormSelect}
              setIsRegistered={setIsRegistered}
              setIsLoggedIn={setIsLoggedIn}
            />
          </>
        )}
      </div>
    </section>
  );
};

Header.propTypes = {
  setFormSelect: PropTypes.func,
  setIsRegistered: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
};
