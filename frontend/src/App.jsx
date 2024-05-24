import AuthenticatedContent from "./components/AuthenticatedContent";
import RegistrationForm from "./components/RegistrationForm";
import SignInForm from "./components/SignInForm";


export const App = () => {
  return (
    <div>
      <h1>Authentication System</h1>
      <RegistrationForm />
      <h2>Sign in</h2>
      <SignInForm />
      <AuthenticatedContent />
    </div>
  );
};


/* import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Router>
          <div>
            <h1>Project Auth</h1>
            <Switch>
              <Route path="/register">
                <RegistrationForm />
              </Route>
            </Switch>
          </div>
        </Router>
      </BrowserRouter>
    </div>
  );
}; */
