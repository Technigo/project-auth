import React, { useState, redirect, useNavigate } from "react";

export const Form = ({ buttonText, formType, token }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    // const navigate = useNavigate();

    // const nextPage = () => {
    //   navigate("/welcome")
    // }
    
    const onSubmit = (event) => {
      event.preventDefault()
    
      fetch(`https://project-auth-ca23vvjbjq-lz.a.run.app/${formType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          localStorage.setItem("accessToken", data.response.accessToken);
          setUsername('')
          setPassword(''); 
        })
        .finally(() => {
          // if (localStorage.getItem("accessToken")) {
          //   navigate("/welcome")
          // } 
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    }

    const handleUsernameInput = (event) =>{
      setUsername(event.target.value)
    }

    const handlePasswordInput = (event) =>{
      setPassword(event.target.value)
    }

   return(
    <form onSubmit={onSubmit}>
      <label>Username:
      <input type="text" value={username} onChange={handleUsernameInput}>
      </input>
      </label>
      <label>Password:
      <input type="text" value={password} onChange={handlePasswordInput}>
      </input>
      </label>
      <button type="submit">{buttonText}</button>
    </form>
   )
}