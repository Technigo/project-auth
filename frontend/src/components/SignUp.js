import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LinkButton } from './Button'
import { InputField } from './Input'

const fetch_URL = 'https://auth-narnia.herokuapp.com/signup'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSignup = event => {
    event.preventDefault()

    fetch(fetch_URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          console.log('error:')
        } else {
          return res.json()
        }
      })
    .then(() => {
          setName('')
          setEmail('')
          setPassword('')
          history.push('/login')
        })
      .catch(err => console.log("error:", err))
  }

  return (
    <form>
      <label> Name:
        <InputField placeholder='Allan Busbrallan' type='text'
        value={name} onChange={event => setName(event.target.value)}/>
      </label>

      <label> Email:
        <InputField placeholder='hey@hey.com' type='email' 
        value={email} onChange={event => setEmail(event.target.value)} /> 
      </label>

      <label> Password:
      <InputField placeholder='*****' type='password' 
        value={password} onChange={event => setPassword(event.target.value)}  /> 
      </label>


      <LinkButton title='Submit' onClick={handleSignup} />
    </form>
  )
}