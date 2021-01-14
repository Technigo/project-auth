import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserDetails = () => {
  const userId = useSelector((store) => store.user.login.userId);
  const history = useHistory();

  return (
    <section>
      <h1>This is your profile page</h1>
      <p>You are successfully logged in as member {userId}!</p>
      <button onClick={() => history.push("/")}>Back</button>
    </section>
  )
};

export default UserDetails;