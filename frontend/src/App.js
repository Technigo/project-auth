import React from 'react'

export const App = () => {
  return (
    <div>
      <p>Login</p>
      <label htmlFor='name'>Input name:</label>
      <input id='name' type='text'></input>
      <label htmlFor='password'>Input password:</label>
      <input id='password' type='password'></input>
      <button>Register User</button>
    </div>
  )
}
