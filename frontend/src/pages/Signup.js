import React, {useState} from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: { email: email, password: password }
      body: JSON.stringify({ email, password })
    }
    event.preventDefault()
    fetch('http://localhost:8080/signup', options)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          E-mail:
          <input 
            type="text" 
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type="submit"/>
      </form>
    </div>
  )
}

export default Signup
