import React, {useState} from 'react'
import './signup.css'

const URL = 'http://localhost:8080/users'

export const SignUp = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signedUp, setSignedUp] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name: name, email: email, password: password}),
      headers: {'Content-Type': 'application/json'}
    }).then(() => {
      setSignedUp('Thanks for signing up!')
      setName('')
      setEmail('')
      setPassword('')
    })
    .catch(err => console.log('error:', err))
    // TODO: Add when next
    // TODO: Add message if there is an error
  }

  return(
    <>
    <form className='signup-container' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <input className='signup-input' type='text'placeholder='Name' value={name} onChange={(event)=> {setName(event.target.value)}} />
      </label>
      <label>
        <input className='signup-input' type='email' placeholder=' Email' value={email} onChange={(event)=> {setEmail(event.target.value)}} />
      </label>
      <label>
        <input className='signup-input' type='password' placeholder=' Password' value={password} onChange={(event)=> {setPassword(event.target.value)}} />
      </label>
      <button type='submit' className='submit-button'>Submit</button>
    </form>
    <p>{signedUp}</p>
    </>
  )
}