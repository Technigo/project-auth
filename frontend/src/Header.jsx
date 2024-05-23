import { Button } from "./Components/Button";

import "./Header.css";

export const Header = () => {
  return (
    <section className="navigation">
      <div>
        <p>Logo</p>
      </div>
      <div className="buttons">
        <Button action="Sign Up" />
        <Button action="Sign In" />
      </div>
    </section>
  );
};
