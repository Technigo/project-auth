import React, { useState } from "react";
import { SignUp } from "./SignUp.js";
import { SignIn } from "./SignIn.js";
import { ContentPage } from "./ContentPage.js";
import { SignOut } from "./SignOut";

export const Home = () => {
  const [signedIn, setSignedIn] = useState(
    JSON.parse(localStorage.getItem("signedIn"))
  );
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="wrapper">
      {!signedIn && ( // Signed out
        <>
          {!showSignUp ? ( // Show Sign in
            <>
              <SignIn setSignedIn={setSignedIn} />
              <button
                onClick={() => setShowSignUp(true)}
                className="sign-in-up-btn">
                Sign up
              </button>
            </>
          ) : (
            // Show Sign up
            <>
              <SignUp setSignedIn={setSignedIn} />
              <button
                onClick={() => setShowSignUp(false)}
                className="sign-in-up-btn">
                Sign in
              </button>
            </>
          )}
        </>
      )}
      {signedIn && ( // Signed in
        <>
          <ContentPage id={localStorage.getItem("userID")} />
          <SignOut setSignedIn={setSignedIn} setShowSignUp={setShowSignUp} />
        </>
      )}
    </div>
  );
};
