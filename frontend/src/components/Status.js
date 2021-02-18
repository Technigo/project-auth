import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "../reducers/user";

export const Status = ({ setSecretPage }) => {
  const dispatch = useDispatch();
  // Accessing data from the redux store using useSelector
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const userName = useSelector((store) => store.user.login.name);

  /* 
  1. handleLogout is called when the user clicks the logout button.
  2. As the button is a submit button we use preventDefault to stop the 
  // page from reloading when the button is clicked.
  3. Then the setSecretPage is set to false - else the user can't access the
  // SecretPage when logging in again, only the UserProfile. 
  4. Then two dispatches are done, one to change the userId, accessToken 
  // and name back to their initial state and the other to set the statusMessage 
  // in the initial state to "Logged out".
  */
  const handleLogout = (event) => {
    event.preventDefault();
    setSecretPage(false);
    dispatch(user.actions.logout());
    dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
  };

  return (
    <>
      <section className="status">
        <h1>Welcome {userName}!</h1>
        <span className="material-icons">account_circle</span>
        <p>{statusMessage}</p>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </>
  );
};