import React from "react";
import { Link } from "react-router-dom";

export const Start = () => {
  return (
    <>
      <Link to="/register">
        <button>Press here to register</button>
      </Link>
      <Link to="/login">
        <button>Press here to sign in</button>
      </Link>

    </>
  )
}