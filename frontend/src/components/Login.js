import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './login.css'

export const Login = () => {
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 
// useEffect(() => {
//     fetch('http://localhost:8080/sessions')
//     .then(res => res.json())
//     .then(json => {
//       console.log(json)
//       setEmail(json)
//       setPassword(json)
//     })
// }, [])

const handleFormSubmit = event => {
  event.preventDefault();
    fetch('http://localhost:8080/sessions', {
        method: 'POST',
        body: JSON.stringify({email, password }),
        headers: { 'Content-Type': 'application/json'}
    })
        .catch(() => {
            alert('try again')
        })
}

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
            <Link to={`/MemberPage`}>
            <button type="submit">Login</button>
            </Link>
        </div>
      </form>
    </section>
  )
}