import React, { useState } from 'react'

export const Signup = () => {

  const [credentials, setCredentials] = useState({
    email : "",
    password : ""
  })

  const handleChange = e => {
    e.preventDefault()
    const value = e.target.value;

    setCredentials({
      ...credentials,
      [e.target.name]: value
    });
    console.log(credentials)
}

  const handleSubmit = () => {

    fetch('http://localhost:8080/users',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credentials })
        }
    ).then(() => {
        window.location.reload()
        console.log(credentials)
    }).catch(e => {console.error(e)})
}

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        email:
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <label>
        password:
        <input type="text" name="password" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}
