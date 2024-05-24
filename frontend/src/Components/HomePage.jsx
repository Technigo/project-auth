import { BtnLogin, BtnSignIn} from "./Buttons";
import "./HomePage.css"
import { SignInForm } from "./SignInForm";

export const HomePage = () => {
  return (
    <div className="home-page-container">
        <h2>Welcome to Arnau's Authentication Project!</h2>
      <nav className="nav">
        <p>If you already have an account</p>
        <BtnSignIn />
        <BtnLogin />
        <SignInForm />
        <p>If you don't</p>
      </nav>
    </div>
  );
};
