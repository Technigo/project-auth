import React, { useState } from "react";
import { Login } from "components/Login";
import { LoggedIn } from "components/LoggedIn";

export const Screen = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  return (
    <>
      {currentScreen === "login" && (
        <Login onSetCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "loggedIn" && <LoggedIn />}
    </>
  );
};
