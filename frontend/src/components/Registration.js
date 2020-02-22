import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './registration.css' 
import MemberPage from 'components/MemberPage' // --van´s profile
// import {LinkButton} from './LinkButton'

const URL = 'http://localhost:8080/register'


export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')
 const [errorMessage, setErrorMessage] = useState(null)
 const [successMessage, setSuccessMessage] = useState(null)

  // To sign up a user.
  const handleFormSubmit = event => {
    event.preventDefault()
    
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if(res.ok) {
        setSuccessMessage("User created!") //sets sucess message
        setErrorMessage(false) // set error message to false
      }
      else {
        setErrorMessage("Could not create user") // set error message
        setSuccessMessage(false) // set successmessage to false
        return res.text().then(json => { throw new Error(json)})
      }
    })
    .then(user => console.log("created user:", user))
    .catch(err => console.log('error:', err))
  };  


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

          {errorMessage && <div className="error-message"> {errorMessage} </div>}
          {successMessage && <div classname="success-message"> {successMessage} </div>}
    
          {/* <Link to={`/MemberPage`}> */}
            <button onClick={handleFormSubmit} type="submit" >Submit</button>
          {/* </Link> */}
          
        </div>
      </form>
    </section>
  )

  }
export default Registration
