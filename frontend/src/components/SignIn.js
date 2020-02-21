import React, { useState } from 'react'

const URL = 'http://localhost:8080/sessions'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signedIn, setSignedIn] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {'Content-Type':'application/json'} 
    }).then((res) => res.json) 
    .then((json) => {
      if (json.notFound) {
        setSignedIn(false)
      } else {
        setSignedIn(true)
      }
    })
  }

  return (
    <>
    <form className='signin-form' onSubmit={handleSubmit}>
      <label>
        Email
        <input type='email' value={email} onChange={(event) => {setEmail(event.target.value)}}/>
      </label>
      <label>
        Password
      <input type='password' value={password} onChange={(event) => {setPassword(event.target.value)}} />
      </label>
      <button className='signin-button' type='submit'>Sign in</button>
    </form>
    <p>{`Signed in: ${signedIn}`}</p>
    </>
  )
}