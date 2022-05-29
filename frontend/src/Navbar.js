import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">sign up</Link>
            <Link to="/secrets">User account</Link>
        </nav>
    </div>
  )
}
