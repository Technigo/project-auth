import { Button } from "./Components/Button";
import logo from "/crypTech.svg";
import PropTypes from "prop-types";

import "./Header.css";

export const Header = ({ setFormSelect, setIsRegistered, isLoggedIn }) => {
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
          />
        ) : (
          <>
            <Button
              action="Sign Up"
              setFormSelect={setFormSelect}
              setIsRegistered={setIsRegistered}
            />
            <Button
              action="Log In"
              setFormSelect={setFormSelect}
              setIsRegistered={setIsRegistered}
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
};
