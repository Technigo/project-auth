import React from "react";
import { Link } from 'react-router-dom';

const LogIn = () => {
    return(
        <>
        <div className="log-in-div">
        <h1>Welcome</h1>
        <form>
            <label>Please log in below</label>
            <input className="user-name-input" type="text" placeholder="Username"></input>
            <input className="password-input" type="text" placeholder="Password"></input>
            <button type="submit">Submit</button>
        </form>

        <Link to={"/register"}>Register here</Link>
        </div>
        </>
    )
}

export default LogIn