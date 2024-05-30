import { BtnLogin, BtnSignIn } from "./Buttons";
import { LoginForm } from "./LoginForm";
import { SignInForm } from "./SignInForm";
import { useStore } from '../stores/storeData';
import "./HomePage.css";

export const HomePage = () => {
  const { showSignInForm, showLoginForm, setShowSignInForm, setShowLoginForm, hideForms } = useStore();

  const handleSignInClick = () => {
    hideForms();  // Hide both forms initially
    setShowSignInForm(true);  // Show SignInForm
  };

  const handleLoginClick = () => {
    hideForms();  // Hide both forms initially
    setShowLoginForm(true);  // Show LoginForm
  };

  return (
    <div className="home-page-container">
      <h2>Welcome!</h2>
      <nav className="nav">
        <p>If you already have an account</p>
        <BtnLogin onClick={handleLoginClick} />
        <p>If you don't</p>
        <BtnSignIn onClick={handleSignInClick} />
        {showSignInForm && <SignInForm />}
        {showLoginForm && <LoginForm />}
      </nav>
    </div>
  );
};


