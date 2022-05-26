import React, { useState, useEffect } from "react";
import SignIn from "./components/sign";
import MyPage from "components/myPage";

export const App = ({ authService }) => {
  const [myPage, setMyPage] = useState(false);
  useEffect(() => {
    authService.token ? setMyPage(true) : setMyPage(false);
  }, [authService.token]);

  const pageRouter = () => {
    authService.token ? setMyPage(true) : setMyPage(false);
  };
  if (myPage) {
    return <MyPage authService={authService} pageRouter={pageRouter} />;
  } else {
    return <SignIn authService={authService} pageRouter={pageRouter} />;
  }
};
