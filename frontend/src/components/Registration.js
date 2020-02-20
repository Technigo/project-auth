import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './registration.css' 
import { MemberPage } from "components/MemberPage"
// import {LinkButton} from './LinkButton'

const URL = "http://localhost:8080/users"

export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')

const handleFormSubmit = (event) => {
  event.preventDefault()
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({name: name, email: email, password: password}),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(json => console.log(json))
  
};

// useEffect(() => {
//     fetch('http://localhost:8080/users')
//     .then(res => res.json())
//     .then(json => {
//       console.log(json)
//       setName(json)
//       setEmail(json)
//       setPassword(json)
//       setRepeat(json)
//     })
// }, [])

// const handleFormSubmit = user => {
//   fetch('http://localhost:8080/users', {
//       method: 'POST',
//       body: JSON.stringify({user}),
//       headers: { 'Content-Type': 'application/json'}
//   })
//       .catch(() => {
//           alert('try again')
//       })
// }

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
         
          <Link to={`/MemberPage`}>
            <button onClick={handleFormSubmit} type="submit" >Submit</button>
          </Link>
          {/* <Link to={`/memberPage`}> <button> sign in </button></Link> */}
        </div>
      </form>
    </section>
  )
}