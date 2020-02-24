import React, { useState } from 'react'
import './registration.css' 

const URL = 'https://pb-auth-api.herokuapp.com/register'

export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')
 const [errorMsg, setErrorMsg] = useState(null)
 const [successMsg, setSuccessMsg] = useState(null)

  // To sign up a user.
  const handleFormSubmit = event => {
    event.preventDefault()
    
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: {'Content-Type': 'application/json'}
    })

    .then(res => {
      if (res.ok) {
        setSuccessMsg("User created!") // set success message
        setErrorMsg(false) // set error message to false
        return res.json()
      }
      else {
        setErrorMsg("could not create user") // set error message
        setSuccessMsg(false) // set success message to false
        return res.text().then(json => { throw new Error(json) })
      }
    })
    .then(user => console.log("created user:", user))
    .catch(err => { console.error(err) }) // previous this code .catch(err =>  console.log('error:', err) )
};  

  return (
    <section>
      <form onSubmit={handleFormSubmit} className="registrationForm" >
      
      <h1><strong>Sign up</strong></h1>
        <div className="infoContainer">  
          <label></label> 
          <input 
            value={name} 
            placeholder="Name" 
            type="text" 
            onChange={event => setName(event.target.value)} 
            required>
          </input>
        
          <label></label>
          <input 
            value={email} 
            placeholder="Email"
            type="email"
            onChange={event => setEmail(event.target.value)} 
            required>
          </input>
          
          <label></label>
          <input value={password} 
          placeholder="Password" 
          type="password"
          onChange={event => setPassword(event.target.value)} 
          required> 
          </input>
    
          <label></label>
          <input 
          value={repeat} 
          placeholder="Repeat Password" 
          type="password"
          onChange={event => setRepeat(event.target.value)} 
          required>
          </input>

          {/* success and error messages */}
          {errorMsg && <div className="error-message"> {errorMsg} </div>}
          {successMsg && <div className="success-message"> {successMsg} </div>}
    
          <button onClick={handleFormSubmit} type="submit" >Submit</button>
    
          
        </div>
      </form>
    </section>
  )

  }
export default Registration;