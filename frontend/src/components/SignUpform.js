import React, { useState  } from 'react'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'

// const SIGNUP_URL = 'http://localhost:8080/users';


export const SignUpform = () => {
  const [signUpUser, setsignUpUser] = useState({
      name: '',
      email: '',
      password: ''
  })

  const [error, SetError] = useState('')
  const [success, setSuccess] = useState('')
  
  const handleSubmit = event => {
    event.preventDefault()
    
    fetch(url,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(signUpUser)
      }
    ).then(res => {
      if (!res.ok) {
        Error("Error")
      }
      res.json()
    })
      .catch((err) => {
        setError(err.message)
      })
      .then(() => {
        setSuccess(`${signUpUser.name}, you are now registered`)
        setsignUpUser({
          name: '',
          email: '',
          password: ''
        })
      })
  }

  // onChange={event => setPlace(event.target.value)}

    return (

        <Article>

          <From onSubmit={handleSubmit}>
         
          <h1>Sign up here</h1>

          <Input
          type="text"
          placeholder="Name"
          required
          value={signUpUser.name}
          onChange={event => setsignUpUser({ ...signUpUser, name: event.target.value })} 
          > 
          </Input>
          <Input
          type="email"
          placeholder="Email"
          required
          value={signUpUser.email}
          onChange={event => setsignUpUser({ ...signUpUser, email: event.target.value })} 
          >
          </Input>
          <Input
          type="password"
          placeholder="Password"
          minlength="8"
          required
          value={signUpUser.password}
          onChange={event => setsignUpUser({ ...signUpUser, password: event.target.value })} 
          >
          </Input>

          <Input type="submit" value="Sign up"></Input>

          </From>
     

        </Article>


   
)}
