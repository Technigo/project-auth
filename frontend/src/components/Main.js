import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from '../utils/urls'
import { thoughts } from "../reducers/thoughts";
import { user } from "../reducers/user";

import { Button, Form, OuterWrapper, InnerWrapper, MessageWrapper, Header, Paragraph, Label, TextArea } from "./GeneralStyles"

const Main = () => {
    const [newThought, setNewThought] = useState("");

    const thoughtItems = useSelector((store) => store.thoughts.items); // We fint the thoughts in the store and set them to the variable thoughtItems
    const dispatch = useDispatch(); // import dispatch hook in order to call upon the reducers in the store.
    const accessToken = useSelector(store => store.user.accessToken); // We get the accessToken in the store
    const navigate = useNavigate(); // import the useNavigate hook

    
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
                "Authorization": accessToken // the accessToken is used for getting all the thoughts and display them for the user
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
                    dispatch(thoughts.actions.setError(data.response)); 
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
            "Authorization": accessToken // We need to use the access token if the user want to make a post. 
          },
          body: JSON.stringify({ message: newThought })
        };
        fetch(API_URL("thoughts"), options)
          .then(response => response.json())
          .then(responsedata => {
            if (responsedata.success) {
              // If the thought is successfully added, update the store with the new thought
              dispatch(thoughts.actions.setError(null));
              dispatch(thoughts.actions.setItems([responsedata.response, ...thoughtItems]));
              setNewThought(""); // Clear the input field
            } else {
              // If there was an error adding the thought, update the store with the error message
              dispatch(thoughts.actions.setError(responsedata.error));
            }
          })
          .catch(error => {
            // Handle any network or fetch errors
            dispatch(thoughts.actions.setError("An error occurred. Please try again."));
          })
          .finally(() => {
            setNewThought(""); // Clear the input field
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
        <OuterWrapper>
          <InnerWrapper>
            <Button type="button" onClick={onLogoutButtonClick}>Logout</Button>
            <Header>Congratulations!</Header>
            <Paragraph>🔮🕵🤫</Paragraph>
            <Paragraph>You have entered the world of secret messages. You can read them below and even create your own secret message!</Paragraph>
            <Form onSubmit={addNewThought}>
                <Label htmlFor="textarea">Enter secret message</Label>
                <TextArea
                required
                aria-label="textarea for input"
                placeholer="Enter message here"
                value={newThought}
                onChange={e => setNewThought(e.target.value)}
                />              
            <Button type="submit">Submit message</Button>
            </Form>
             <Header>Secret message board</Header>            
            {thoughtItems.map(item => {
                return(
                <MessageWrapper key={item._id}>
                <Paragraph>{item.message}</Paragraph>
                </MessageWrapper>
                )
            })}
          </InnerWrapper>
        </OuterWrapper>
    );
}

export default Main;