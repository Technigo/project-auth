import React, { useState } from "react";

import { Status } from "./Status";
import { user } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const SECRET_URL = "https://project-signup.herokuapp.com/secret";
//"http://localhost:8080/secret"

export const UserProfile = () => {
  const [secretPage, setSecretPage] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secretMessage,
      })
    );
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const logout = () => {
    dispatch(user.actions.logout());
    dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
  };

  const testSecret = (event) => {
    // Included userId in the path?
    event.preventDefault();
    setSecretPage(true);
    fetch(SECRET_URL, {
      method: "GET",
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not access profile");
        }
        return res.json();
      })
      // SUCCESS: Do something with the information we got back
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
          <h1>Welcome</h1>
          <div className="button-container">
            <button type="submit" onClick={testSecret} value="Test Secret">
              Secret info
            </button>
            <button type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        </section>
      ) : (
        <Status />
      )}
    </section>
  );
};
