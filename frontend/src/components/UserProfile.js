import React from "react";

import { user } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const SECRET_URL = "http://localhost:8080/secret";

export const UserProfile = () => {
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

  const testSecret = () => {
    // Included userId in the path?
    fetch(`${SECRET_URL}`, {
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
    return <></>;
  }

  return (
    <section class="profile">
      {/* <h2>Profile:</h2>
      <h4>userId:</h4>
      <p>{`${userId}`}</p>
      <h4>accesstoken</h4>
      <p>{`${accessToken}`}</p> */}
      <h4>Welcome </h4>
      <input type="submit" onClick={testSecret} value="Test Secret" />
      <input type="submit" onClick={logout} value="Test Logout" />
    </section>
  );
};
