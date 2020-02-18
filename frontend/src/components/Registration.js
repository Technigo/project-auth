import React, {useState} from 'react'
import './registration.css' 

export const Registration = (props) => {
 const[name, setName] = useState('')
 const[email, setEmail] = useState('')
 const[password, setPassword] = useState('')
 const[repeat, setRepeat] = useState('')

const handleFormSubmit = (event) => {
  event.preventDefault()
  fetch('http://localhost:8080/users', {
    method: "POST",
    body: JSON.stringify({name, email, password}),
    headers: {"Content-Type": "application/json"}
  })
  .then(() => {
    setName("")
    setEmail("")
    setPassword("")
  })
  
}

// useEffect(() => {
//     fetch('http://localhost:8080/users')
//     .then(res => res.json())
//     .then(json => {
//       console.log(json)
//       setName(json)
//       setEmail(json)
//       setPassword(json)
//       setRepeat(json)
//     })
// }, [])

// const handleFormSubmit = user => {
//   fetch('http://localhost:8080/users', {
//       method: 'POST',
//       body: JSON.stringify({user}),
//       headers: { 'Content-Type': 'application/json'}
//   })
//       .catch(() => {
//           alert('try again')
//       })
// }




  return (
    <section>
      <form className="registrationForm" >
      <h1><strong>Sign up</strong></h1>
      <h2>Not a member? Fill in this form and you're all set!</h2>
        <div className="infoContainer">  
          <label>Name:</label> 
          <input value={name} placeholder="Enter Username" type="text" name="name" onChange={event => {setName(event.target.value)}} required></input>
        
          <label >Email:</label>
          <input value={email} placeholder="Enter Name"type="email" name="email" onChange={event => {setEmail(event.target.value)}} required></input>
          
          <label>Password:</label>
          <input value={password} placeholder="Enter Password" type="password"  name="password" onChange={event => {setPassword(event.target.value)}} required> 
          </input>
    
          <label>Repeat Password:</label>
          <input value={repeat} placeholder="Repeat Password" type="password"  name="repeat" onChange={event => {setRepeat(event.target.value)}} required>
          </input>
    
          <button type="submit" onClick={handleFormSubmit}>Submit</button>
        </div>
      </form>
    </section>
  )
}