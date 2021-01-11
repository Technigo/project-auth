import React from 'react'

export const Register = () => {
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
      Register
    </button>

    </form>
  )
}