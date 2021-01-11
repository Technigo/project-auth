import React from 'react'

export const SignIn = () => {
  return (
    <form>
      <label>
        Username: 
        <input className='name'
          type='text'/>
      </label>

      <label>
        Password: 
        <input className='password'
          type='text'/>
      </label>

    <button className='register-button' type='submit'>
      Sign in
    </button>
    </form>
  )
}