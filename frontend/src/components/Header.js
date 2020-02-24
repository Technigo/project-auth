/* eslint-disable operator-linebreak */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from 'reducers/auth'
import { BtnLogOut } from 'components/UI'

export const Header = () => {
  const dispatch = useDispatch()

  // Check if there is not token in localstorage from preview session
  if (window.localStorage.accessToken) {
    dispatch(auth.actions.login())
  }

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  )

  return (
    <header>
      <nav>
        <span>
          <Link to="/">
            <strong>Auth'O'Matic</strong>
          </Link>
        </span>
        <span>
          {isAuthenticated && <BtnLogOut />}
          {!isAuthenticated &&
            <>
              <Link to="/login">
                <button type="button">Log In</button>
              </Link>
              <Link to="/signup">
                <button type="button">Sign Up</button>
              </Link>
            </>}
        </span>
      </nav>
      <div className="hero">
        <h1>Auth 'O' Matic</h1>
        <h3>Simple Authentication/Authorization tool</h3>
        <h2>Created by Pinky and The Brain</h2>
      </div>
    </header>
  )
}