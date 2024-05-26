import { BtnLogin, BtnSignIn } from "./Buttons";
import { LoginForm } from "./LoginForm";
import { SignInForm } from "./SignInForm";
import { useStore } from '../stores/storeData'
import "./HomePage.css";

export const HomePage = () => {
  const { showSignInForm, showLoginForm, setShowSignInForm, setShowLoginForm } =
    useStore();

  return (
    <div className="home-page-container">
      <h2>Welcome!</h2>
      <nav className="nav">
        <p>If you already have an account</p>
        <BtnLogin onClick={() => setShowLoginForm(true)} />
        <p>If you don't</p>
        <BtnSignIn onClick={() => setShowSignInForm(true)} />
        {showSignInForm && <SignInForm />}
        {showLoginForm && <LoginForm />}
      </nav>
    </div>
  );
};
