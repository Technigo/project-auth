import React from 'react'
import { useDispatch } from 'react-redux'

import { account } from '../reducers/account'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleOnClick = (props) => {
    dispatch(props)
  }

  return (
    <div className="landingpage-section-wrapper">
      <section className="landingpage-section login-section">
        <h3>Log in</h3>
        <form className="form login-form">
          <label htmlFor="username">username</label>
          <input className="input login-username-input" type="text" value=""/>
          <label htmlFor="password">password</label>
          <input className="input login-password-input" type="text" value=""/>
          <button className="btn login-button" onClick={() => handleOnClick(account.actions.logIn(true))}>log in</button>
        </form>
        <div>
          <p> Not yet a member? </p>
          <button className="create-btn" onClick={() => handleOnClick(account.actions.showSignupForm(true))}> create an account</button>
        </div>
      </section>
    </div>
  )
}
export default LoginForm