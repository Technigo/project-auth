import React from 'react'

// const URL = 'http://localhost:8000/sessions'

export const LogoutUser = props => {
  const accessToken = localStorage.removeItem('accessToken')


  const onLoggedOut = event => {
    event.preventDefault()
    window.localStorage.removeItem('accessToken', accessToken)
  }



  return (
    <div>
      <button
        className="button"
        type="submit"
        onClick={onLoggedOut}>
        LOG OUT
        </button>
    </div>
  )
}
