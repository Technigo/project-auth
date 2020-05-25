import React from "react";

export const SignOut = ({ setSignedIn, setShowSignUp }) => {
  const handleOnClick = () => {
    localStorage.clear();
    setSignedIn(false);
    setShowSignUp(false);
    localStorage.setItem("signedIn", false);
  };

  return <button onClick={handleOnClick}>Sign out</button>;
};
