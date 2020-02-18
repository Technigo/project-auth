import React, {useState} from 'react'

export const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

// Need to create functions that handle form submit
// We also need to think about the interplay between the frontend and backend parts
  return (
    <div className="form-container">
      <form>
        <div className="form-title">Register</div>

        <div className="form-text">Name</div>
        <input 
          type="text"
          onChange={event => setName(event.target.value)} 
          value={name}
          placeholder="Name"
        />
        
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
          Register
        </button>
      </form>
    </div>
  )
}