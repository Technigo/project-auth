import { BtnLogin, BtnSignIn, BtnSubmit } from "./Buttons";
import "./HomePage.css"

export const HomePage = () => {
  return (
    <div className="home-page-container">
        <p>Welcome to Arnau's Authentication Project!</p>
        <hr />
      <nav className="nav">
        <p>If you already have an account:</p>
        <BtnSignIn />
        <hr />
        <p>If you do not have one:</p>
        <BtnLogin />
      </nav>
    </div>
  );
};
