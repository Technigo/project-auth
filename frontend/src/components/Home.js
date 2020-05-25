import React, { useState } from "react";
import { SignUp } from "./SignUp.js";
import { SignIn } from "./SignIn.js";
import { ContentPage } from "./ContentPage.js";
import { SignOut } from "./SignOut";

export const Home = () => {
  const [signedIn, setSignedIn] = useState(
    JSON.parse(localStorage.getItem("signedIn"))
  );
  const [id, setId] = useState(localStorage.getItem("userID"));

  return (
    <>
      {!signedIn && (
        <>
          <SignUp setSignedIn={setSignedIn} />
          <SignIn setSignedIn={setSignedIn} />
        </>
      )}
      {signedIn && (
        <>
          <ContentPage id={id} />
          <SignOut setSignedIn={setSignedIn} />
        </>
      )}
    </>
  );
};
