import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import surfPosts from "reducers/surfPosts";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import styled from "styled-components/macro";

const Form = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken);
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const onPostSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({
        headline: headline,
        message: message,
        location: location
      })
    }
    fetch(API_URL("surfposts"), options)
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          console.log("post submitted")
          const newPost = data.response;
          dispatch(surfPosts.actions.addPost(newPost))
          setHeadline("");
          setLocation("");
          setMessage("");
        } else {
          console.log("submission failed")
        }
      })
      .catch((error) => {
        console.error("An error occured:", error);
      });
  };
  return (
    <>
      <StyledForm onSubmit={onPostSubmit}>
        <label htmlFor="headline">Title</label>
        <input
          type="text"
          id="headline"
          value={headline}
          placeholder="Name your post"
          onChange={e => setHeadline(e.target.value)} />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          placeholder="Where in the world did you surf?"
          onChange={e => setLocation(e.target.value)} />
        <label htmlFor="message">Message</label>
        <textarea
          className="message"
          id="message"
          value={message}
          placeholder="How was the surf?"
          rows="4"
          cols="40"
          onChange={e => setMessage(e.target.value)} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column; 
  width: 250px;
  gap: 10px;
  padding: 10px;
  margin-bottom: 15px;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`

const SubmitButton = styled.button`
  border: 2px solid #257ca3;
  color: white;
  background-color: #257ca3;
  width: 68px;
  border-radius: 20px;
  font-family: Urbanist;
  cursor: pointer;

  &:hover {
    border: 2px solid black;
    background-color: black;
    color: white;
  }
  
  &:disabled {
    background-color: #e3e4e6;
    border: 2px solid #e3e4e6;
    color: white;
  }
`

export default Form
