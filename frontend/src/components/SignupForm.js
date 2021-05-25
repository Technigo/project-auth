import React from 'react'
import { useDispatch } from 'react-redux'

import { account } from '../reducers/account'

const SignupForm = () => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(account.actions.showSignupForm(false))
  }

  return (
    <div className="landingpage-section-wrapper">
      <section className="landingpage-section signup-section">
        <h3>Sign Up!</h3>
        <form className="form signup-form">
          <label htmlFor="username">username</label>
          <input className="input signup-username-input" type="text" value=""/>
          <label htmlFor="Email">Email</label>
          <input className="input signup-Email-input" type="email" value=""/>
          <label htmlFor="password">password</label>
          <input className="input signup-password-input" type="password" value=""/>
          <label htmlFor="password">verify password</label>
          <input className="input signup-password-input" type="password" value=""/>
          <button className="btn signup-button">Sign Up</button>
        </form>
        <div>
          <p> Already a member? </p>
          <button className="login-btn" onClick={handleOnClick}> Log in here!</button>
        </div>
      </section>
    </div>

  )
}

export default SignupForm 