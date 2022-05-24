import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <section className="navbar">
      <div className="title-box">
        <h1>
          <Link to="/">Navbar here</Link>
        </h1>
      </div>
      <div className="link-box">
        <button>
          <NavLink to="/login">Log in</NavLink>
        </button>
        <button>
          <NavLink to="/register">Register</NavLink>
        </button>
        <button>Log out</button>
      </div>
    </section>
  );
};
//Only shown when user is logged in
