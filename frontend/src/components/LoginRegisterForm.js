import React, { useState } from "react";

const LoginRegisterForm = ({ state, name, setName, email, setEmail, password, setPassword }) => {

    const handleNameChange = (event) => { 
        setName(event.target.value)
    }
    const handleEmailChange = (event) => { 
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => { 
        setPassword(event.target.value)
    }

  return (
    <>
      <h1>Form in state {state}</h1>
      {state === "register" && <input type="text" name="name" value={name} placeholder="enter your name" onChange={handleNameChange}/> }
      <input type="email" name="email" value={email} placeholder="enter your email" onChange={handleEmailChange}/>
      <input type="password" name="password" value={password} placeholder="enter your password" onChange={handlePasswordChange}/>
    </>
  );
};

export default LoginRegisterForm;
