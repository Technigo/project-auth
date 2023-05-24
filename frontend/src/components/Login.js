import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";

const Login = () => {
    // The component initializes state variables for username,
    // password, and mode using the useState hook.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // `mode` and `setMode` manage the state of the login/register mode.
    const [mode, setMode] = useState("login");

    // Dispatch function from Redux

    // The `useDispatch` hook is used to access the `dispatch` function provided by Redux.
    // It allows us to dispatch actions to update the Redux store.
    const dispatch = useDispatch();

    // Navigation function from react-router-dom
    // The `useNavigate` hook is used to access the `navigate` function provided by react-router-dom.
    // It allows us to programmatically navigate to different routes in the application.
    const navigate = useNavigate();

    // Access token from Redux store

    // The `useSelector` hook is used to extract data from the Redux store.
    // In this case, it extracts the `accessToken` value from the `user` slice of the store.
    const accessToken = useSelector((store) => store.user.accessToken);

    // The `useEffect` hook is used to perform side effects in functional components.
    // In this case, it checks if the `accessToken` is available (indicating the user is logged in)
    // and navigates to the home page if true.
    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken]);

    /// Form submission handler

    // The `onFormSubmit` function is called when the form is submitted.
    // It prevents the default form submission behavior, makes a POST request to the API,
    // and dispatches relevant actions based on the response.
    const onFormSubmit = (event) => {
        event.preventDefault();

        // Request options for the fetch call

        // The `options` object defines the request options for the fetch call.
        // It specifies the HTTP method, headers, and body containing the username and password.
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        };

        // API call to login or register

        // The `fetch` function is used to make an HTTP request to the API endpoint specified by `API_URL(mode)`.
        // It passes the `options` object as the second argument to configure the request.
        // The response is then converted to JSON format using the `response.json()` method.
        // The response data is then processed and relevant actions are dispatched accordingly.
        fetch(API_URL(mode), options)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // If login or registration is successful

                    // Dispatch relevant actions to update the Redux store with the user data
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setUsername(data.response.username));
                    dispatch(user.actions.setUserId(data.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    // If login or registration fails

                    // Dispatch relevant actions to clear user data and set error message
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(data.response));
                }
            });
    };

    return (
        <>
            {/* Radio buttons for selecting login or register mode */}
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

            {/* Login/registration form */}
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
