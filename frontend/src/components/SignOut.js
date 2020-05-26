import React from "react";

export const SignOut = ({ setSignedIn, setShowSignUp }) => {
  const handleOnClick = () => {
    localStorage.clear();
    setShowSignUp(false);
    localStorage.setItem("signedIn", JSON.stringify(false));
    setSignedIn(JSON.parse(localStorage.getItem("signedIn")));
  };

  return <button onClick={handleOnClick} className="signout-btn">Sign out</button>;
};
