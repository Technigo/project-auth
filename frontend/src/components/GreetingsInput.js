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
    console.log('handleFormCleanup har kört')
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
      ) 
      .catch((error) => console.error(error))
      .finally (() => handleFormCleanup())
    
    // .then(() => {
    //   fetch(API_URL("/greetings"),
      
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: accessToken,
    //     },
        
    //   }) 
    //   .catch(error => console.error(error))
    //   .finally (
    //     handleFormCleanup()
    //   )
    // })

    fetch(API_URL("/greetings"),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      })
      .catch(error => console.error(error))
  }
  
    return (
      <InputWrapper>
        <InputForm className="form-container" onSubmit={handleFormSubmit}>
          <Input
            type="text"
            required
            placeholder="Receiver of greeting"
            onChange={handleRecieverChange} />
          <textarea
            rows="5"
            required
            onChange={handleGreetingChange}
            placeholder="Write some christmas rhymes here" />
  
          <Button type="submit" className="post-button" value="Post btn">
            🎄 Send 🎄
          </Button>
        </InputForm>
      </InputWrapper>
    );
  };
  

const InputWrapper = styled.div`
  margin: 0.5rem auto 0;
  width: 60vw;
`;

const InputForm = styled.form`
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const Input = styled.input`
  margin: 10px 0;
  
`;

const Button = styled.button`
  width: 100%;
  max-width: 100px;
  margin: 10px auto;
  cursor: pointer;
`;
