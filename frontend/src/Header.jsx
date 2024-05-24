
import { Button } from "./Components/Button";
import logo from "/crypTech.svg";
import PropTypes from "prop-types";

import "./Header.css";

export const Header = ({formSelect, setFormSelect}) => {


  return (
    <section className="navigation">
      <div id="crypTech">
        <img id="logo" src={logo} alt="crypTech" />
        <h1>crypTech</h1>
      </div>
      <p>{formSelect}</p>
      <div className="buttons">
        <Button action="Sign Up" setFormSelect={setFormSelect} />
        <Button action="Log In" setFormSelect={setFormSelect} />
      </div>
    </section>
  );
};

Header.propTypes = {
  formSelect: PropTypes.string,
  setFormSelect: PropTypes.string
}
