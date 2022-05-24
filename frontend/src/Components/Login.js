import React, { useState } from 'react'

import  { API_URL }  from '../../src/utils/constants'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    //This function posts the form to the database
    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }

        fetch(API_URL('signup'), options)
        .then(res => res.json())
        .then((data) => console.log(data))

    }
    
  return (
    
    <div className="wrapper">

      <h1>Welcome to our login page!</h1>


        <form onSubmit={onFormSubmit}>

          <label htmlFor='username'>Username</label>
          
          <input
          id="username" 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor='password'>Password</label>


          <input
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>
          
        </form>
    
    </div>
  )
}

export default Login