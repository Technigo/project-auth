import React from "react";
import { user } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import { PrimaryButton } from "../lib/PrimaryButton";
import { StyledSection } from "./styling/StyledSection";

const AccesTokenStyle = styled.p`
  font-size: 10px;
`;

export const Profile = ({ URL }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const name = useSelector((store) => store.user.login.name);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

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
        statusMessage: "You are loged out",
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
    <StyledSection>
      <h2> {`Hello ${name}`}</h2>
      <p>{`${statusMessage}`}</p>
      <p>
        <strong>This is your user user id:</strong> {`${userId}`}
      </p>
      <p>Access token:</p>
      <AccesTokenStyle>{`${accessToken}`}</AccesTokenStyle>

      <div>
        <PrimaryButton
          small
          type="submit"
          onClick={testSecret}
          value="Secret message"
          title="Secret"
        />
        <PrimaryButton small type="submit" onClick={logout} title="Logout" />
      </div>
    </StyledSection>
  );
};
export default Profile;
