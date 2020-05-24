import React, { useState } from 'react';
import { InputText } from './InputText.js';

export const Form = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loginFailed, setLoginFailed] = useState(false)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/users`, {
      method: "POST",
      body: JSON.stringify({
        name: inputValue.name,
        email: inputValue.email,
        password: inputValue.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.accessToken)
        if (json.accessToken) {
          console.log("hello")
          //Save accessToken to localStorage
          localStorage.setItem('accessToken', json.accessToken);
        } else if (!json.signUpSuccessful) {
          console.log("not hello")
          setLoginFailed(true)
        }
        //CHECK IF BACKEND COULD CREATE USER

        // Save accessToken to local storage?
        //headers: { "Authotzzzzz": "accessToken" },


        // GÖR DETTA I SAMBAND MED UTLOGGKLICK localStorage.removeItem('accessToken');
      });

    //Empty inputValue object. 
  };

  console.log(loginFailed)



  return (
    <form onSubmit={handleFormSubmit}>
      <InputText
        value={inputValue.name}
        name="name"
        label="Name"
        type="text"
        id="inputName"
        placeholder="Name"
        setInputValue={setInputValue}
        minLength="1"
      />
      <InputText
        value={inputValue.email}
        name="email"
        label="Email"
        type="email"
        id="inputEmail"
        placeholder="Email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputText
        value={inputValue.password}
        name="password"
        label="Password"
        type="password"
        id="inputPassword"
        placeholder="Password"
        setInputValue={setInputValue}
        minLength="6"
      />
      <button>submit</button>
      {loginFailed && <p>Login failed</p>}
    </form>
  );
};
