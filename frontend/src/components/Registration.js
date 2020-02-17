import React, {useState, useEffect} from 'react'

export const Registration = () => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')

useEffect(() => {
    fetch('http://localhost:8080/users')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setName(json)
      setEmail(json)
      setPassword(json)
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
      <form  submitForm={handleFormSubmit}>
        <label>Name:
        <input value={name} type="text" name="name" onChange={event => {setName(event.target.value)}}></input>
        </label>
        <label >Email:
        <input value={email} type="email" name="email" onChange={event => {setEmail(event.target.value)}}></input>
        </label>
        <label>Password:
        <input value={password} type="password" name="password" onChange={event => {setPassword(event.target.value)}}> 
        </input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}