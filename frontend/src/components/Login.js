import React, { useState } from 'react';
import styled from 'styled-components';

// Add more styling
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  `


// On form-submit function



export const Login = () => {
//states to store username and password input
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')


    // useEffect + POST req here (posts username + password)
    // probably store response in reducer/global state?

// The login form
  return (
    <Wrapper>
        <h2>Log in:</h2>
        <form>
          <label>
            Username:
            <input 
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input 
            type="text"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit" onClick="">Submit</button>
        </form>
    </Wrapper>
  )
}

// something has to happen onClick.