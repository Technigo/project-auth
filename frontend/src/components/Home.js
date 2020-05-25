import React, { useState } from "react";
import { SignUp } from "./SignUp.js";
import { SignIn } from "./SignIn.js";
import { ContentPage } from "./ContentPage.js";
import { SignOut } from "./SignOut";

export const Home = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <>
      {!signedIn && ( // Signed out
        <>
          {!showSignUp ? // Show Sign in
            <>
              <SignIn setSignedIn={setSignedIn} />
              <button onClick={() => setShowSignUp(true)}>Sign up</button>
            </>
            : // Show Sign up
            <SignUp setSignedIn={setSignedIn} />
          }
        </>
      )}
      {signedIn && ( // Signed in
        <>
          <ContentPage id={localStorage.getItem("userID")} />
          <SignOut setSignedIn={setSignedIn} setShowSignUp={setShowSignUp} />
        </>
      )}
    </>
  );
};
