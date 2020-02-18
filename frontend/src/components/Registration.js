import React, {useState, useEffect} from 'react'
import registration from 'components/registration.css'

export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')

useEffect(() => {
    fetch('http://localhost:8080/users')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setName(json)
      setEmail(json)
      setPassword(json)
      setRepeat(json)
    })
}, [])

const handleFormSubmit = user => {
    fetch('http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: { 'Content-Type': 'application/json'}
    })
        .catch(() => {
            alert('try again')
        })
}

  return (
    <section>
      <form class="registrationForm" submitForm={handleFormSubmit}>
      <h1><strong>Sign up</strong></h1>
      <h2>Please fill in this form to create an account</h2>
        <label>Name:
        <input value={name} placeholder="Enter Username" type="text" name="name" onChange={event => {setName(event.target.value)}} required></input>
        </label> 
        <label >Email:
        <input value={email} placeholder="Enter Name"type="email" name="email" onChange={event => {setEmail(event.target.value)}} required></input>
        </label>
        <label>Password:
        <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => {setPassword(event.target.value)}} required> 
        </input>
        </label>
        <label>Repeat Password:
        <input value={repeat} placeholder="Repeat Password" type="password"  name="repeat" onChange={event => {setRepeat(event.target.value)}} required>
        </input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}