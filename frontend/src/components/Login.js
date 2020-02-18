import React, {useState, useEffect} from 'react'
import login from 'components/login.css'

export const Login = () => {
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 
useEffect(() => {
    fetch('http://localhost:8080/users')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setEmail(json)
      setPassword(json)
    })
}, [])

const handleFormSubmit = user => {
    fetch('http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: { 'Content-Type': 'application/json'}
    })
        .catch(() => {
            alert('try again')
        })
}

  return (
    <section>
      <form class="loginForm" submitForm={handleFormSubmit}>
      <h1><strong>Member login</strong></h1>
      <h2>Welcome back</h2>
        <label >Username/Email:
        <input value={email} placeholder="Enter Email"type="email" name="email" onChange={event => {setEmail(event.target.value)}} required></input>
        </label>
        <label>Password:
        <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => {setPassword(event.target.value)}} required> 
        </input>
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  )
}