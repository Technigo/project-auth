import React from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const userId = useSelector((store) => store.user.login.userId);

  return (
    <section>
      <h1>This is your profile page</h1>
      <p>You are successfully logged in as member ${userId}</p>
    </section>
  )
};

export default UserDetails;