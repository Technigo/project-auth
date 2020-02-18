import React, {useState} from 'react'

export const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

// Need to create functions that handle form submit
// We also need to think about the interplay between the frontend and backend parts
// We should think about if the user would sign-in with email, name or both
// In this component we should also check whether the password is correct or not
  return (
    <div className="form-container">
      <form>
        <div className="form-title">Sign-in</div>
        
        <div className="form-text">Email</div>
        <input
          type="text"
          onChange={event => setEmail(event.target.value)}
          value={email}
          placeholder="Email"
        />

        <div className="form-text">Password</div>
        <input
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
          placeholder="Password"
        />
        
        <br></br>
        
        <button 
          className="btn-submit"
          type="submit"
        >
          Sign-in
        </button>
      </form>
    </div>
  )
}