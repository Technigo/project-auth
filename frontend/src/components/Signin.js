import React, {useState} from 'react'

export const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

// Need to create functions that handle form submit and add styling with CSS
// We also need to think about the interplay between the frontend and backend parts
// We should think about if the user would sign-in with email, name or both
// In this component we should also check whether the password is correct or not
  return (
    <div>
      <form>
        <div>Sign-in</div>
        
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