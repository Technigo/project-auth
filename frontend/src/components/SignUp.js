import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { user } from 'reducer/user'
import { useHistory } from 'react-router-dom'


export const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()


  const handleSignUp = event => {
    event.preventDefault()

    fetch("https://camilla-and-viktorias-secret.herokuapp.com/users",
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })

      })
      .then((res) => {
        if (!res.ok) {
         // history.push('/') 
          dispatch(user.actions.logout())
          throw 'Could not log in, try a different username or password'
        } 
          return res.json()
        
      }).then(({ email, password }) => {
        
        window.localStorage.setItem('password', password)
        window.localStorage.setItem('email', email)
        dispatch(user.actions.login())
        history.push('/sign-in')
       
          
      
      })
      .catch((err) => {
        // här kommer inte något felmeddelande om man fyller i en redan existerade person. 
        alert('Could not create user, try another username and password')
        
        
       throw new Error('Creta e new user, ')
       
      })


    // dispatch(user.actions.logout())
  }


  return (
    <section>
      <h1 className='title-header'>Sign up to see our secret 🤫 </h1>
      <form onSubmit={handleSignUp}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <input
          type='submit'
          value='Sign up'
          className='button'>
        </input>
      </form>
    </section>
  )
}

