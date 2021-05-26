import React, {useState} from 'react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  return (
    <main className="main-container">
    <h1>Hello! Hello! Welcome! Register or Sign in to access awesomeness</h1>
    <form>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <div className="button-container">
      <button>REGISTER</button>
      <button>SIGN IN</button>
      </div>
    </form>
    </main>
  )
}

export default Register