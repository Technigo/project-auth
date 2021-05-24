import React from 'react'
import { useDispatch } from 'react-redux'

import { account } from '../reducers/account'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(account.actions.showSignupForm(true))
  }

  return (
    <section className="landingpage-section login-section">
      <h3>Log in</h3>
      <form className="form login-form">
        <label htmlFor="username">username</label>
        <input className="input login-username-input" type="text" value=""/>
        <label htmlFor="password">password</label>
        <input className="input login-password-input" type="text" value=""/>
        <button className="btn login-button">log in</button>
      </form>
      <div>
        <p> Not yet a member? </p>
        <button className="create-btn" onClick={handleOnClick}> create an account</button>
      </div>
    </section>
  )
}
export default LoginForm