import React from "react";

import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";

const StartPage = () => {
  const sessionAlias = localStorage.getItem("sessionAlias");

  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      {sessionAlias && <h3>Hi {sessionAlias}!</h3>}
      {!sessionAlias && <h3>Hi!</h3>}
      <p>You are logged in.</p>
      <p>You can access your profile by clicking on the button below.</p>
      <ProfileButton />
      <LogoutButton />
    </section>
  );
};

export default StartPage