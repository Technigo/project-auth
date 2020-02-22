import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './registration.css' 
import MemberPage from 'components/MemberPage' // --van´s profile
// import {LinkButton} from './LinkButton'

const URL = 'http://localhost:8080/users'


export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')
 const [loggedInUser, setLoggedInUser] = useState(null)

  // To sign up a user.
  const handleFormSubmit = event => {
    event.preventDefault()
    
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => setLoggedInUser(json))
    .catch(err => console.log('error:', err))
  };  

if (loggedInUser === null) {
  // If user is logged out, show login form
  return (
    <section>
      <form onSubmit={handleFormSubmit} className="registrationForm" >
      <h1><strong>Sign up</strong></h1>
      <h2>Not a member? Fill in this form and you're set!</h2>
        <div className="infoContainer">  
          <label>Name:</label> 
          <input value={name} placeholder="Enter Name" type="text" name="name" onChange={event => setName(event.target.value)} required></input>
        
          <label >Email:</label>
          <input value={email} placeholder="Enter Email"type="email" name="email" onChange={event => setEmail(event.target.value)} required></input>
          
          <label>Password:</label>
          <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => setPassword(event.target.value)} required> 
          </input>
    
          <label>Repeat Password:</label>
          <input value={repeat} placeholder="Repeat Password" type="password"  name="repeat" onChange={event => setRepeat(event.target.value)} required>
          </input>
         
          {/* <Link to={`/MemberPage`}> */}
            <button onClick={handleFormSubmit} type="submit" >Submit</button>
          {/* </Link> */}
          
        </div>
      </form>
    </section>
  )
} else {
  // If user is logged in, show profile
  return (<MemberPage loggedInUser={loggedInUser}/>);
}
}

export default Registration;
