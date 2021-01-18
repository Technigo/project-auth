import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Status } from "./Status";
import { user } from "../reducers/user";

const SECRET_URL = "https://project-signup.herokuapp.com/secret";
//"http://localhost:8080/secret";

export const UserProfile = () => {
  //Using the useState, secretPage, to help naviagate to the Status component if the user presses the Secret info button. This calls the testSecret function which changes the state from false to true.
  const [secretPage, setSecretPage] = useState(false);

  const dispatch = useDispatch();
  // Accessing data from the redux store using useSelector
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userName = useSelector((store) => store.user.login.name);
  const loginSuccessMessage = useSelector((store) => store.user.login.statusMessage);

  //The response from the fetch to the GET request is passed to the setStatusMessage reducer in the redux store. This message is then shown in the Status.js
  const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secretMessage,
      })
    );
  };

  // If the response from the  to the GET request is not successful then the loginFailed function is called which updated the statusMessage in the redux store
  const loginFailed = (error) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: error.toString() }));
  };

  /* 
  1. If the user clicks the logout button the handleLogout function is called. 
  2. The setSecretPage is set to false which means that the Status.js component won't be shown.
  3. Then two dispatches are done, one to change the userId, accessToken and name back to their initial state and the other to set the statusMessage in the initial state to "Logged out".
  */
  const handleLogout = () => {
    setSecretPage(false);
    dispatch(user.actions.logout());
    dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
  };

  /* Handle showing the secret page for the user:
  1. This fucntion is called when the user clicks the profile details button.
  2. Because we're using submit on the button we used the event.PreventDefault to stop the page from re-loading when the user presses the button.
  3. Then the setSecretPage is set to true in order for the Status.js component to be rendered, instead of the UserProfile return jsx.
  4. The fetch is then triggered using the secrets endpoint.
  5. This uses the accessToken that's stored in the redux store as part of the authentication process in the authenticateUser function in server.js.
  6. The accessToken is passed via the header. 
  7. If it's a match one already existing in the database then the secrets endpoint will be called, the json data is returned from the endpoint in server.js (a secretMessage), and passed to the loginSuccess function and d the Status.js component will be shown. 
  7. If not a match then the throw in both the fetch and in authenticateUser is actioned I believe. 
  8. Also the catch is actioned and the loginFailed function is called which returns an updated statusMessage to the redux store.
  */
  const handleTestSecret = (event) => {
    event.preventDefault();
    setSecretPage(true);

    fetch(SECRET_URL, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not access profile");
        }
        return res.json();
      })
      .then((json) => loginSuccess(json))
      .catch((err) => loginFailed(err)); //401
  };

  if (!accessToken) {
    return null;
  }

  return (
    <section>
      {!secretPage ? (
        <section>
          <h1>Welcome {userName}!</h1>
          <span className="material-icons">check_circle</span>
          <p>{loginSuccessMessage}</p>
          <div className="button-container">
            <button type="submit" onClick={handleTestSecret} value="Test Secret">
              Profile details
            </button>
            <button type="submit" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>
      ) : (
        // Passing the useState setSecretPage to status.js so this can also be used when the user clicks the logout button. We noticed that when the user signs in, loggs out and then loggs in again they were automatically taken to the Status.js component. Passing this useState as props means we don't have to refresh the page to stop this from happening.
        <Status setSecretPage={setSecretPage}/>
      )}
    </section>
  );
};
