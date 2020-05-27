import React from "react";

export const SignOut = ({ setSignedIn, setShowSignUp }) => {
  const handleOnClick = () => {
    localStorage.clear();
<<<<<<< HEAD
    setShowSignUp(false);
=======
>>>>>>> 4d24a626a2684be7583e3b1ff9390d7e0533b82f
    localStorage.setItem("signedIn", JSON.stringify(false));
    setSignedIn(JSON.parse(localStorage.getItem("signedIn")));
  };

  return <button onClick={handleOnClick} className="signout-btn">Sign out</button>;
};
