// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useEffect, useState } from "react"; // Import required modules from React
import { useDispatch, useSelector } from "react-redux"; // Import required modules from React Redux
import { useNavigate } from "react-router-dom"; // Import required modules from React Router
import { thoughts } from "reducers/thoughts"; // Import the "thoughts" reducer from the "reducers" folder
import { API_URL } from "utils/urls"; // Import the "API_URL" constant from the "utils/urls" module
import { user } from "reducers/user"; // Import the "user" reducer from the "reducers" folder
import { StickyNotes } from './StickyNotes'; // Import

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// MAIN APP /////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items); // Access the "items" value from the "thoughts" reducer in the Redux store
    const dispatch = useDispatch(); // Access the Redux dispatch function
    const accessToken = useSelector((store) => store.user.accessToken); // Access the "accessToken" value from the Redux store
    const username = useSelector((store) => store.user.username); // Access the "username" value from the Redux store
    const navigate = useNavigate(); // Access the navigation function from React Router
    const [message, setMessage] = useState("");

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

    const postNewThought = (e) => {
        e.preventDefault();
      
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({ message }), // Corrected: Use `message` instead of `newThought`
        };
      
        fetch(API_URL("thoughts"), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              dispatch(thoughts.actions.setError(null));
              dispatch(thoughts.actions.setItems([...thoughtItems, data.response]));
              setMessage("");
            } else {
              dispatch(thoughts.actions.setError(data.error));
            }
          });
      };
      
      // //////////////////////////////////////////////////////////////////////// //
      // ///////////////////////////// RETURN JSX /////////////////////////////// //
      // //////////////////////////////////////////////////////////////////////// //

    return (
      <>
      <button className="Btn" onClick={onLogoutButtonClick}>
      <div className="sign">
    <svg viewBox="0 0 512 512">
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
    </svg>
  </div>
  
  <div className="text">Logout</div>
      </button>
      {username ? <h2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h2> : ''}
      <div className='sticky-notes-container'>
          <form className='messageForm' onSubmit={postNewThought}>
              <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
              />
              <button type="submit">Post Message</button>
          </form>
          <StickyNotes thoughts={thoughtItems} />
      </div>
  </>
);
};