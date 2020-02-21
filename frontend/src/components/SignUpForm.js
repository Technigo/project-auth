import React, {useState} from 'react' ;
import {Link} from 'react-router-dom'

export const SignUpForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')

// post to API backend localhost:8080/users
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('event handleSubmit= when a new user signs up')
// Sends the POST request with the input from your form 
    fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: { 'Content-Type': 'application/json' }
    })
      //.then((res) => res.json())
     // .catch(err => console.log('error:', err))
      .then(res => {

        if (!res.ok) {

          throw new Error("Something went wrong");

        }

       // {secrets};

        return res.json();

      })
  
}
  
  return (
    <div className='backgroundContainer'>
      <form className='mainContainer' onSubmit={handleSubmit}>
        <label className='text'>
          {/* sign up */}
          <p>sign up</p>
          <input className='formField' 
            type='text'
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
            placeholder= 'your name'
          />
        </label>
        <label className='text'>
          {/* e-mail */}
         
          <input className='formField' 
            type='email'
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
            placeholder='example@gmail.com'
          />
        </label>
        <label className='text'>
          {/* password */}
          
          <input className='formField' 
            type='password'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            placeholder='password'
          />
        </label>
        <div className='btn-Container'>
          {/*<Link to='/secrets'><button  type='submit' className='btn' >sign up</button></Link>*/}
         <button  type='submit' className='btn' >sign up</button>
        </div>
        <div className='sign-in-container'>
       <Link to='/sessions'> <p className='sign-in'>sign in</p></Link>
       
        </div>
      </form>
    </div>
  )
}