import React, {useState} from 'react'

const URL_AUTH = 'http://localhost:8080/users'

export const SignUp = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [accessToken, setAccessToken] = useState()

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL_AUTH,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
      }
    ).then((res) => res.json())
    .then((userData) => {
      console.log(userData)
    })
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        placeholder="name"
        onChange={event => setName(event.target.value)}
        requiered
      />
      <input
        type='email'
        value={email}
        placeholder="email"
        onChange={event => setEmail(event.target.value)}
        requiered />
      <input
        type='password'
        value={password}
        placeholder="password"
        onChange={event => setPassword(event.target.value)} reuiered />
      <button onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  )
  }