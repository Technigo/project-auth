import React, { useEffect } from "react"; // Import required modules from React
import { useDispatch, useSelector } from "react-redux"; // Import required modules from React Redux
import { useNavigate } from "react-router-dom"; // Import required modules from React Router
import thoughts from "reducers/thoughts"; // Import the "thoughts" reducer from the "reducers" folder
import { API_URL } from "utils/urls"; // Import the "API_URL" constant from the "utils/urls" module
import user from "reducers/user"; // Import the "user" reducer from the "reducers" folder

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items); // Access the "items" value from the "thoughts" reducer in the Redux store
    const dispatch = useDispatch(); // Access the Redux dispatch function
    const accessToken = useSelector((store) => store.user.accessToken); // Access the "accessToken" value from the Redux store
    const username = useSelector((store) => store.user.username); // Access the "username" value from the Redux store
    const navigate = useNavigate(); // Access the navigation function from React Router

    useEffect(() => {
        // Perform an action when the component mounts or when the "accessToken" value changes
        if (!accessToken) {
            navigate("/login"); // Navigate to the login page if the user is not logged in
        }
    }, [accessToken]);

    useEffect(() => {
        // Perform an action when the component mounts
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken, // Set the Authorization header with the access token
            },
        };

        fetch(API_URL("thoughts"), options)
            .then((res) => res.json()) // Parse the response as JSON
            .then((data) => {
                if (data.success) {
                    // If the response is successful
                    dispatch(thoughts.actions.setError(null)); // Clear any previous error in the "thoughts" reducer
                    dispatch(thoughts.actions.setItems(data.response)); // Set the "items" value in the "thoughts" reducer with the response data
                } else {
                    // If the response is not successful
                    dispatch(thoughts.actions.setError(response)); // Set the error message in the "thoughts" reducer
                    dispatch(thoughts.actions.setItems([])); // Set an empty array as the "items" value in the "thoughts" reducer
                }
            });
    });

    const onLogoutButtonClick = () => {
        // Perform an action when the logout button is clicked
        dispatch(user.actions.setAccessToken(null)); // Clear the "accessToken" value in the Redux store
        dispatch(user.actions.setUsername(null)); // Clear the "username" value in the Redux store
        dispatch(user.actions.setUserId(null)); // Clear the "userId" value in the Redux store
        dispatch(user.actions.setError(null)); // Clear any previous error in the Redux store
        dispatch(thoughts.actions.setItems([])); // Set an empty array as the "items" value in the "thoughts" reducer
    };

    return (
        <>
            <button type="button" onClick={onLogoutButtonClick}>
                LOGOUT
            </button>
            {username ? <h2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h2> : ""}
            {thoughtItems.map((item) => {
                return <p key={item._id}>{item.message}</p>; // Render paragraphs for each thought item in the "thoughtItems" array
            })}
        </>
    );
};

export default Main;
