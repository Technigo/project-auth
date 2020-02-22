import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import './login.css'
// import MemberPage from 'components/MemberPage' // --van´s profile

const URL = 'http://localhost:8080/sessions'

export const Login = ()  => {
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const [errorMessage, setErrorMessage] = useState(null)

 // To log in an exicting member
const handleFormSubmit = event => {
  event.preventDefault();

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify({email, password }),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
        return res.txt().then(json => {throw new Error(json)})
      }
    })
    .then(user => {
      if(user['message']) {
        setErrorMessage(user.message)
      }
      else {
        window.localStorage.setItem("userId", user.userId)
        window.localStorage.setItem("accessToken", user.accessToken)
        window.location.ref = "./MemberPage"
      }
    })
    .catch(err => console.log("error", err))

  };


  // If user is logged out, show login form
  return (
    <section>
      <form className="loginForm" submitForm={handleFormSubmit}>
        <h1><strong>Member login</strong></h1>
        <h2>Welcome back - we've missed you!</h2>
        <div className="loginContainer">  
            <label >Username/Email:  </label>
            <input value={email} placeholder="Enter Email"type="email" name="email" onChange={event => {setEmail(event.target.value)}} required></input>
        
            <label>Password:     </label>
            <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => {setPassword(event.target.value)}} required> 
            </input>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button onClick={handleFormSubmit} type="submit">Login</button>
        </div>
      </form>
    </section>
  )

}

export default Login