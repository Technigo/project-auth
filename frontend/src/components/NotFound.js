import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <main className='login-container'>
      <form className='form-container'>
        <h1>Page not found</h1>
        <Link to='/'>
          <button className='submit-button'>
            <p>Go back</p>
          </button>
        </Link>
      </form>
    </main>
  )
}
