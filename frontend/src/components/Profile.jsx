import React from "react";
import { user } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export const Profile = ({ URL }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const name = useSelector((store) => store.user.login.name);

  const LOGOUT_URL = `${URL}/users/logout`;
  const SECRET_URL = `${URL}/users/${userId}/secret`; //users/:id/secret

  const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secretMessage,
      })
    );
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(
      user.actions.setStatusMessage({ statusMessage: loginError.message })
    );
  };

  const logoutSuccess = () => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: "Logout success",
      })
    );
    dispatch(user.actions.setAccessToken({ accessToken: null }));
  };

  const logoutFailed = (logoutError) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: logoutError.message,
      })
    );
  };

  const logout = () => {
    // Include userId in the path
    fetch(LOGOUT_URL, {
      method: "POST",
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to logout");
        }
        return res.json();
      })
      // SUCCESS: Do something with the information we got back
      .then((json) => logoutSuccess(json))
      .catch((err) => logoutFailed(err));
  };

  const testSecret = () => {
    // Include userId in the path
    fetch(`${SECRET_URL}`, {
      method: "GET",
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Profile test failed");
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
    <section>
      <h2>Profile:</h2>
      <h4>Name:</h4>
      <p> {`${name}`}</p>
      <h4>userId:</h4>
      <p> {`${userId}`}</p>
      <h4>accessToken:</h4>
      <p> {`${accessToken}`}</p>
      <input type="submit" onClick={testSecret} value="Secret message" />
      <input type="submit" onClick={logout} value="Logout" />
    </section>
  );
};
export default Profile;
