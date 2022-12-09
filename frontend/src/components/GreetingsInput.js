/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable comma-dangle */
import React, { useState } from "react";
import styled from "styled-components/macro";
import { API_URL } from "utils/utils";
import { useSelector } from "react-redux";

export const GreetingsInput = () => {
  
  const accessToken = useSelector((store) => store.user.accessToken);
  const [receiver, setReceiver] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGreetingChange = (event) => {
    setGreeting(event.target.value);
  }
  const handleRecieverChange = (event) => {
    setReceiver(event.target.value);
  }
  // This code empties the form
  const handleFormCleanup = () => {
    setGreeting('');
    setReceiver('')
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(API_URL("greetings"),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify({ receiver: receiver, message: greeting})
      }
    ).then(() => {
      fetch(API_URL("greetings"),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        
      })
      //window.location.reload()
    })
  }
  
    return (
      <InputWrapper>
        <InputForm className="form-container" onSubmit={handleFormSubmit}>
          <input
            type="text"
            required
            placeholder="Receiver of greeting"
            onChange={handleRecieverChange} />
          <textarea
            rows="5"
            required
            onChange={handleGreetingChange}
            placeholder="Write some christmas rhymes here"
          >
          </textarea>
  
          <Button type="submit" className="post-button" value="Post btn">
            🎄 Send Christmas Greeting 🎄
          </Button>
        </InputForm>
      </InputWrapper>
    );
  };
  

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 60vw;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
`;
