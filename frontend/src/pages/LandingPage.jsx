import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      Hello click to login{" "}
      <button onClick={() => navigate("signin")}>Sign in!</button>
    </>
  );
};

export default LandingPage;
