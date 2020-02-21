import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Main = () => {
  const history = useHistory();
  return (
    <>
      <button onClick={() => history.push("/login")}>Login</button>
      <button onClick={() => history.push("/register")}>Register</button>
    </>
  );
};
