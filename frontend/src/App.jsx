import AuthenticatedContent from "./components/AuthenticatedContent";
import RegistrationForm from "./components/RegistrationForm";
import SignInForm from "./components/SignInForm";
import { useState } from 'react'


export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  const handleSigninSuccess = (username) => {
    setIsAuthenticated(true)
    setUsername(username)
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setUsername('')
    sessionStorage.removeItem('accessToken')
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <div>
          <h1>Authentication System</h1>
          <RegistrationForm />
          <h2>Sign in</h2>
          <SignInForm onSignInSuccess={handleSigninSuccess} />
        </div>
      ) : (
        <AuthenticatedContent username={username} onSignOut={handleSignOut} />
      )}
    </div>
  );
};
