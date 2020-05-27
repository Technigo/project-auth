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



  // const handlesignUp = (event) => {
  //   event.preventDefault();
  // }
  
  // fetch(SIGNUP_URL, {
  //   method: 'POST',
  //   body: JSON.stringify({name, email, password }),
  //   Headers: { 'Content-Type': 'application/json' }
  // })

  // .then((res) => res.json())
  // .then((json) => {
  //     setsignUpUser(json)
  //      })
  // }

    return (

        <Article>

          <From>
          <h1>Sign up here</h1>

          <Input
          type="text"
          placeholder="Name"
          required
          > 
          </Input>
          <Input
          type="email"
          placeholder="Email"
          required
          >
          </Input>
          <Input
          type="password"
          placeholder="Password"
          minlength="8"
          required
          >
          </Input>

          <Input type="submit" value="Sign up" ></Input>

          </From>
     

        </Article>


   
)}
