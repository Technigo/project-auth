import { Button } from "./Components/Button";
import logo from '/crypTech.svg'

import "./Header.css";

export const Header = () => {
  return (
    <section className="navigation">
      <div id="crypTech">
        <img id="logo" src={logo} alt="crypTech" />
        <h1>crypTech</h1>
      </div>
      <div className="buttons">
        <Button action="Sign Up" />
        <Button action="Sign In" />
      </div>
    </section>
  );
};
