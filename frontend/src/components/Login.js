import React, { useEffect, useState } from "react"; // Import required modules from React
import { useDispatch, useSelector } from "react-redux"; // Import required modules from React Redux
import { useNavigate } from "react-router-dom"; // Import required modules from React Router
import user from "reducers/user"; // Import the "user" reducer from the "reducers" folder
import { API_URL } from "utils/urls"; // Import the "API_URL" constant from the "utils/urls" module

const Login = () => {
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
            .then((lalalala) => lalalala.json()) // Parse the response as JSON
            .then((potato) => {
                if (potato.success) {
                    // If the response is successful
                    console.log(potato);
                    dispatch(user.actions.setAccessToken(potato.response.accessToken)); // Update the "accessToken" value in the Redux store
                    dispatch(user.actions.setUsername(potato.response.username)); // Update the "username" value in the Redux store
                    dispatch(user.actions.setUserId(potato.response.id)); // Update the "userId" value in the Redux store
                    dispatch(user.actions.setError(null)); // Clear any previous error in the Redux store
                } else {
                    // If the response is not successful
                    dispatch(user.actions.setAccessToken(null)); // Clear the "accessToken" value in the Redux store
                    dispatch(user.actions.setUsername(null)); // Clear the "username" value in the Redux store
                    dispatch(user.actions.setUserId(null)); // Clear the "userId" value in the Redux store
                    dispatch(user.actions.setError(potato.response)); // Set the error message in the Redux store
                }
            });
    };

    return (
        <>
            <label htmlFor="register">Register</label>
            <input
                type="radio"
                id="register"
                checked={mode === "register"}
                onChange={() => setMode("register")}
            />
            <label htmlFor="login">Login</label>
            <input
                type="radio"
                id="login"
                checked={mode === "login"}
                onChange={() => setMode("login")}
            />
            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Login;
