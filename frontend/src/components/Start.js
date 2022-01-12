import React from "react";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  let navigate = useNavigate();

  return (
    <div className="container">
      <h1>Riddle master?</h1>
      <p>Climb the security levels and solve them all</p>
      <button type="button" onClick={() => navigate("/signin")}>
        Sign up/Log in
      </button>
    </div>
  );
};
