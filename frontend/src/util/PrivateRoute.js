import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => (window.localStorage.accessToken ? (
        children
      )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }} />
        ))} />
  )
}