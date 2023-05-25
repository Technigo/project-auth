import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from '../utils/urls'
import { thoughts } from "../reducers/thoughts";
import { user } from "../reducers/user";

const Main = () => {
    const [newThought, setNewThought] = useState("");

    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();

    
    ///////////////////////USE EFFECT CHECK ACCESS KEY///////////////
    ////////////////////////////////////////////////////////////////
    // This useEffect checks if there is an existing AccessToken (which means the user is not logged in or trying to access the page without being registered). If not the UseNavigate hook is used to navigate to the loginpage.
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]); //The accessToke is used as a dependency


    ////////////////////USE EFFECT FETCH ALL THOUGHTS OF USER////////////
    ////////////////////////////////////////////////////////////////////
    //This useEffect is used to fetch all the thoughts of the user when the component is rendered.
    useEffect(() => {
        const options = {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    //If the fetch is successful the error is set to null and the items (which is the list of thoughts) is set to the response from the database, displaying all thoughts. 
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems(data.response));
                } else {
                    //If the fetch is unsuccessful the error is set to the response that is returned from the server and the items(thoughtslist) is set to be an empty array.
                    dispatch(thoughts.actions.setError(response)); 
                    dispatch(thoughts.actions.setItems([]));
                }
            });
    })

    const addNewThought = (event) => {
        event.preventDefault();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
          },
          body: JSON.stringify({ message: newThought })
        };
        fetch(API_URL("thoughts"), options)
          .then(response => response.json())
          .then(responsedata => {
            if (responsedata.success) {
              // If the thought is successfully added, update the store with the new thought
              dispatch(thoughts.actions.setError(null));
              dispatch(thoughts.actions.setItems([responsedata.response, ...items]));
              setNewThought(""); // Clear the input field
            } else {
              // If there was an error adding the thought, update the store with the error message
              dispatch(thoughts.actions.setError(responsedata.error));
            }
          })
          .catch(error => {
            // Handle any network or fetch errors
            dispatch(thoughts.actions.setError("An error occurred. Please try again."));
          });
      };
      

    //////////////////LOGOUT BUTTON CLICK////////////////////
    //////////////////////////////////////////////////////
    const onLogoutButtonClick = () => {
        //When the user clicks the logout button. Everything is set back to null. The access key is set to null and the users is logged out and brought back to the login page. 
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
    }

    return(
        <>
            <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
            <form onSubmit={addNewThought}>
                <label htmlFor="textarea">Enter thought here
                <textarea 
                aria-label="textarea for input"
                placeholer="Enter message here"
                value={newThought}
                onChange={e => setNewThought(e.target.value)}
                />
                </label>

            <button type="submit">Submit thought</button>
            </form>

            {username ? (<h2>THESE ARE THE THOUGHTS OF {username.toUpperCase()}</h2>): ""}
            {thoughtItems.map(item => {
                return(<p key={item._id}>{item.message}</p>)
            })}
        </>
    );
}

export default Main;