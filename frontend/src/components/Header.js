/* eslint-disable operator-linebreak */
import React from 'react'
import { Link } from 'react-router-dom'
import { BtnLogOut } from 'components/UI'

export const Header = () => (
  <header>
    {window.localStorage.accessToken && <BtnLogOut />}
    {!window.localStorage.accessToken &&
      <>
        <Link to="/login">
          <button type="button">Log In</button>
        </Link>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
      </>}
  </header>
)