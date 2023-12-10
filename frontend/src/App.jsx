import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  `;

  const RegistrationForm = () => (
    <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Register</button>
    </div>
  );
  
  const SignInForm = () => (
    <div>
      {/* Add your sign-in form here */}
    </div>
  );

  const AuthenticatedContent = () => (
    <div>
      {/* Add your authenticated content here */}
    </div>
  );
  
  const SignOutButton = () => {
    const handleSignOut = () => {
      // Remove the saved access token here
      // Redirect the user to the login form
    };
  
    return <button onClick={handleSignOut}>Sign Out</button>;
  };

  export const App = () => {
    return (
      <Router>
        <AppContainer>
          <Switch>
            <Route path="/register">
              <RegistrationForm />
            </Route>
            <Route path="/login">
              <SignInForm />
            </Route>
            <Route path="/content">
              <AuthenticatedContent />
              <SignOutButton />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </AppContainer>
      </Router>
    );
  };

