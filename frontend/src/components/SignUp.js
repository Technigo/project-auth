import React, { useState } from 'react';
import { InputText } from './InputText.js';

export const SignUp = ({ setSignedIn }) => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [signUpFailed, setSignUpFailed] = useState(false)

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
        if (json.accessToken) {
          //Save accessToken to localStorage
          setSignedIn(true)
          localStorage.setItem('accessToken', json.accessToken);
          localStorage.setItem('userID', json._id);
        } else if (!json.signUpSuccessful) {
          setSignUpFailed(true)
        }
        // GÖR DETTA I SAMBAND MED UTLOGGKLICK localStorage.removeItem('accessToken');
      });

    //Empties inputValue object
    setInputValue({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <p>Sign Up</p>
      <InputText
        value={inputValue.name}
        name="name"
        label="Name"
        type="text"
        placeholder="Name"
        setInputValue={setInputValue}
        minLength="1"
      />
      <InputText
        value={inputValue.email}
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        setInputValue={setInputValue}
        minLength="3"
      />
      <InputText
        value={inputValue.password}
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        setInputValue={setInputValue}
        minLength="6"
      />
      <button>submit</button>
      {signUpFailed && <p>SignUp failed</p>}
    </form>
  );
};
