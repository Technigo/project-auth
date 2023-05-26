import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import { MainWrapper, ButtonLogout, Greetings, ThoughtsContainer, Thought } from './Main.styled.js';

const Main = () => {
    // Selecting thought items from Redux store

    // The `useSelector` hook is used to extract data from the Redux store.
    // In this case, it extracts the `thoughtItems` array from the `thoughts` slice of the store.
    const thoughtItems = useSelector((store) => store.thoughts.items);

    // Dispatch function from Redux

    // The `useDispatch` hook is used to access the `dispatch` function provided by Redux.
    // It allows us to dispatch actions to update the Redux store.
    const dispatch = useDispatch();

    // Access token and username from Redux store

    // The `useSelector` hook is used to extract data from the Redux store.
    // In this case, it extracts the `accessToken` and `username` values from the `user` slice of the store.
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);

    // Navigation function from react-router-dom

    // The `useNavigate` hook is used to access the `navigate` function provided by react-router-dom.
    // It allows us to programmatically navigate to different routes in the application.
    const navigate = useNavigate();

    // Redirect to login page if not logged in

    // The `useEffect` hook is used to perform side effects in functional components.
    // In this case, it checks if the `accessToken` is available (indicating the user is logged in)
    // and navigates to the login page if false.
    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken]);

    // Fetch thoughts from the API

    // The `useEffect` hook is used to perform side effects in functional components.
    // In this case, it fetches thoughts from the API when the component is rendered.
    // It sends a GET request to the `API_URL("thoughts")` endpoint, passing the `accessToken` in the headers.
    // The response is then converted to JSON format using the `response.json()` method.
    // Based on the response, relevant actions are dispatched to update the Redux store with the thoughts data.
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
            },
        };

        fetch(API_URL("thoughts"), options)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // If fetching thoughts is successful

                    // Dispatch relevant actions to update the Redux store with the thoughts data
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems(data.response));
                } else {
                    // If fetching thoughts fails

                    // Dispatch relevant actions to set error message and clear thought items
                    dispatch(thoughts.actions.setError(data.response));
                    dispatch(thoughts.actions.setItems([]));
                }
            });
    }, []);

    // Logout button click handler

    // The `onLogoutButtonClick` function is called when the logout button is clicked.
    // It dispatches relevant actions to clear user and thought data from the Redux store.
    const onLogoutButtonClick = () => {
        // Dispatch relevant actions to clear user and thought data from the Redux store
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
    };

    return (
        <MainWrapper>
            {/* Logout button */}
            <ButtonLogout type="button" onClick={onLogoutButtonClick}>
                LOGOUT
            </ButtonLogout>

            {/* Display username if available */}
            {username ? (
                <Greetings>HI {username.toUpperCase()}! Suggestions by Students of Junior Science Lab®</Greetings>
            ) : (
                ""
            )}

            {/* Display thought items */}
            <ThoughtsContainer>
                {thoughtItems.map((item) => {
                    return <Thought key={item._id}>{item.message}</Thought>;
                })}
            </ThoughtsContainer>
        </MainWrapper>
    );
};

export default Main;
