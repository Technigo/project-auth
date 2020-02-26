import React from 'react'


export const LogoutUser = props => {
  // const accessToken = localStorage.removeItem('accessToken')


  const onLoggedOut = event => {
    event.preventDefault()
    window.localStorage.removeItem('accessToken')
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
