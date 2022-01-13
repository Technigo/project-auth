import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "components/Login";
import { LoggedIn } from "components/LoggedIn";

export const Screen = () => {
  const token = useSelector((store) => store.user.user.accessToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        {token && <Route path="/game" element={<LoggedIn />} />}
      </Routes>
    </BrowserRouter>
  );
};
