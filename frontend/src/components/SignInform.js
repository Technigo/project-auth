import React, { useState } from 'react'

import { Profile } from './Profile'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'

export const SignInform = () => {
  
const [signInUser, setsignInUser] = useState({
  email: '',
  password: ''
})

const [error, setError] = useState('')
const [ success, setSuccess ] = useState('')

const handleSubmit = event => {
event.preventDefault()

fetch("http://localhost:8080/sessions",
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(signInUser)
  }
).then(res => {
  if (!res.ok) {
    error("Error")
  }
  res.json()

})
  .catch((err) => {
    setError(err.message)
  })
  .then(() => {
    setSuccess();
    setsignInUser({
      id: signInUser._id, accessToken: signInUser.accessToken,
      email: '',
      password: ''
    })
  })
}


if (!signInUser.accessToken) {

return (

    <Article>

      <From onSubmit={handleSubmit}>
     
      <h1>Sign in</h1>

      <Input
      type="email"
      placeholder="Email"
      required
      value={signInUser.email}
      onChange={event => setsignInUser({ ...signInUser, email: event.target.value })} 
      >
      </Input>
      <Input
      type="password"
      placeholder="Password"
      minlength="8"
      required
      value={signInUser.password}
      onChange={event => setsignInUser({ ...signInUser, password: event.target.value })} 
      >
      </Input>

      <Input type="submit" value="Sign up"></Input>

      </From>
 

    </Article>



)} else  {

  return <Profile />

}

} 





