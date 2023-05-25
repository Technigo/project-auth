// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORT ///////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useEffect, useState } from "react"; // Import required modules from React
import { useDispatch, useSelector } from "react-redux"; // Import required modules from React Redux
import { useNavigate } from "react-router-dom"; // Import required modules from React Router
import user from "reducers/user"; // Import the "user" reducer from the "reducers" folder
import { API_URL } from "utils/urls"; // Import the "API_URL" constant from the "utils/urls" module

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////////// APP /////////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const Login = () => {
    const [username, setUsername] = useState(""); // Create a state variable for the username
    const [password, setPassword] = useState(""); // Create a state variable for the password
    const [mode, setMode] = useState("login"); // Create a state variable for the login mode ("login" or "register")
    const dispatch = useDispatch(); // Access the Redux dispatch function
    const navigate = useNavigate(); // Access the navigation function from React Router
    const accessToken = useSelector((store) => store.user.accessToken); // Access the "accessToken" value from the Redux store

    useEffect(() => {
        // Perform an action when the component mounts or when the "accessToken" value changes
        if (accessToken) {
            navigate("/"); // Navigate to the homepage if the user is already logged in
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }), // Create a JSON string from the username and password
        };

        fetch(API_URL(mode), options)
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                if (data.success) {
                    // If the response is successful
                    console.log(data);
                    dispatch(user.actions.setAccessToken(data.response.accessToken)); // Update the "accessToken" value in the Redux store
                    dispatch(user.actions.setUsername(data.response.username)); // Update the "username" value in the Redux store
                    dispatch(user.actions.setUserId(data.response.id)); // Update the "userId" value in the Redux store
                    dispatch(user.actions.setError(null)); // Clear any previous error in the Redux store
                } else {
                    // If the response is not successful
                    dispatch(user.actions.setAccessToken(null)); // Clear the "accessToken" value in the Redux store
                    dispatch(user.actions.setUsername(null)); // Clear the "username" value in the Redux store
                    dispatch(user.actions.setUserId(null)); // Clear the "userId" value in the Redux store
                    dispatch(user.actions.setError(data.response)); // Set the error message in the Redux store
                }
            });
    };

    // //////////////////////////////////////////////////////////////////////// //
    // //////////////////////////////// RETURN JSX //////////////////////////// //
    // //////////////////////////////////////////////////////////////////////// //

    return (
        <>
            <div id="container">
                {/* Cover Box */}
                <div id="cover">
                    {/* Sign Up Section */}
                    <h1 className="sign-up">Hello, Friend!</h1>
                    <p className="sign-up">Enter your personal details<br /> and start a journey with us</p>
                    <a
                        className={`button sign-up ${mode === 'register' ? 'active' : ''}`}
                        href="#cover"
                        onClick={() => setMode('register')}
                    >
                        Sign Up
                    </a>

                    {/* Sign In Section */}
                    <h1 className="sign-in">Welcome Back!</h1>
                    <p className="sign-in">To keep connected with us please<br /> login with your personal info</p>
                    <br />
                    <a
                        className={`button sub sign-in ${mode === 'login' ? 'active' : ''}`}
                        href="#"
                        onClick={() => setMode('login')}
                    >
                        Sign In
                    </a>
                </div>

                {/* Login Box */}
                <div id="login">
                    <h1>Sign In</h1>
                    <form onSubmit={onFormSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <input className="submit-btn" type="submit" value="Sign In" />
                    </form>
                </div>

                {/* Register Box */}
                <div id="register">
                    <h1>Create Account</h1>
                    <form onSubmit={onFormSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <input
                            className="submit-btn"
                            type="submit"
                            value="Sign Up" />
                    </form>
                </div>
            </div>
        </>

    );
};
