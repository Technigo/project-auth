import React, { useState } from 'react';

const URL = 'http://localhost:8080/users';

export const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = event => {
    event.preventDefault()

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ name, password, email}),
    headers: { 'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label>
        Name:
        <input 
        required
        value={name}
        onChange={event => setName(event.target.value)}/>
      </label>
      <label>
        Email:
        <input 
        required
        value={email}
        onChange={event => setEmail(event.target.value)}/>
      </label>
      <label>
        Password:
        <input 
        required
        value={password}
        onChange={event => setPassword(event.target.value)}/>
      </label>
      <button type="submit" onClick={handleSubmit}>Sign up!</button>
      </form>
    </div>
  )
}