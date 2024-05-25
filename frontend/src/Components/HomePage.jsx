import { BtnLogin, BtnSignIn} from "./Buttons";
import "./HomePage.css"
import { LoginForm } from "./LoginForm";
import { SignInForm } from "./SignInForm";

export const HomePage = () => {
  return (
    <div className="home-page-container">
        <h2>Wellcome!</h2>
      <nav className="nav">
        <p>If you already have an account</p>
        <BtnSignIn />
        <BtnLogin />
        <p>If you don't</p>
        {/* <SignInForm /> */}
        <LoginForm />
      </nav>
    </div>
  );
};
