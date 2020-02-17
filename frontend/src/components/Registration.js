import React, {useState} from 'react'

export const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

// Need to create functions that handle form submit and add styling with CSS
// We also need to think about the interplay between the frontend and backend parts
  return (
    <div>
      <form>
        <div>Register</div>

        <div>Name</div>
        <input 
          type="text"
          onChange={event => setName(event.target.value)} 
          value="name" 
          placeholder="Name"
        />
        
        <div>Email</div>
        <input
          type="text"
          onChange={event => setEmail(event.target.value)}
          value="email"
          placeholder="Email"
        />

        <div>Password</div>
        <input
          type="text"
          onChange={event => setPassword(event.target.value)}
          value="password"
          placeholder="Password"
        />
      </form>
    </div>
  )
}