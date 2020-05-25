import React from "react";

export const SignOut = ({ setSignedIn }) => {
  const handleOnClick = () => {
    localStorage.clear();
    setSignedIn(false);
    localStorage.setItem("signedIn", false);
  };

  return <button onClick={handleOnClick}>Sign out</button>;
};
