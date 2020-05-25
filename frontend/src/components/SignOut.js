import React from "react";

export const SignOut = ({ setSignedIn }) => {
  const handleOnClick = () => {
    localStorage.clear();
    localStorage.setItem("signedIn", JSON.stringify(false));
    setSignedIn(JSON.parse(localStorage.getItem("signedIn")));
  };

  return <button onClick={handleOnClick}>Sign out</button>;
};
