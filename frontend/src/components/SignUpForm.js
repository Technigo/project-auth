import React, {useState} from 'react' ;

export const SignUpForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

// post to API backend localhost:8080/users
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('event handleSubmit= when a new user signs up')
// Sends the POST request with the input from your form 
    fetch('https://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .catch(err => console.log('error:', err))
  
}
  
  return (
    <div className='backgroundContainer'>
      <form className='mainContainer' onSubmit={handleSubmit}>
        <label className='text'>
          {/* name */}
          <p>name</p>
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
          <p>e-mail</p>
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
          <p>password</p>
          <input className='formField' 
            type='text'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            placeholder='*******'
          />
        </label>
        <div className='btn-Container'>
          <button  type='submit' className='btn' >submit</button>
        </div>
      </form>
    </div>
  )
}