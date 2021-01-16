import React from "react";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";

const StartPage = () => {
  const currentAlias = useSelector((store) => store.user.login.alias);

  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      {currentAlias && <h3>Hi {currentAlias}!</h3>}
      {!currentAlias && <h3>Hi!</h3>}
      <p>You are logged in.</p>
      <p>You can access your profile by clicking on the button below.</p>
      <ProfileButton />
      <LogoutButton />
    </section>
  )
};

export default StartPage