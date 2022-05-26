import React from "react";
import SignIn from "./components/sign";

export const App = ({ authService }) => {
  const goToMyPage = () => {
    console.log("go to my page!");
  };
  return <SignIn authService={authService} goToMyPage={goToMyPage} />;
};
