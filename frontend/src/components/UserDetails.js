import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LogoutButton from "./LogoutButton";

const UserDetails = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const history = useHistory();

  return (
    <section>
      {accessToken &&
        <>
          <h1>This is your profile page</h1>
          <p>You are successfully logged in as member {userId}!</p>
          <button onClick={() => history.push("/")}>Back</button>
          <LogoutButton />
        </>
      }
      {!accessToken &&
        <>
          <h1>Logged out</h1>
          <p>Your session has been terminated. Please log in again.</p>
          <button onClick={() => history.push("/")}>Back to login</button>
        </>
      }
    </section>
  )
};

export default UserDetails;