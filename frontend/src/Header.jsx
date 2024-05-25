import { Button } from "./Components/Button";
import logo from "/crypTech.svg";
import PropTypes from "prop-types";

import "./Header.css";

export const Header = ({
  setFormSelect,
  setIsMessage,
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
            setIsMessage={setIsMessage}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <>
            <Button
              action="Sign Up"
              setFormSelect={setFormSelect}
              setIsMessage={setIsMessage}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Button
              action="Log In"
              setFormSelect={setFormSelect}
              setIsMessage={setIsMessage}
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
  setIsMessage: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
};
