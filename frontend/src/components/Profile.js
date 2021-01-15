import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { user } from '../reducers/user'
import { getSecretMessage } from '../reducers/thunk'

//const SECRET_URL = 'https://project-auth-cla-ellen.herokuapp.com/secrets'

export const Profile = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  

  const logout = () => {
    dispatch(
      user.actions.setLogout()
    )
  }
  
  return (
    <div>
      <p>Welcome! here is your profile!</p>
      <p>Status Message: {`${statusMessage}`}</p>
      {console.log(`här är ${accessToken}`)}
      <button type="submit" onClick={() => dispatch(getSecretMessage(accessToken))}>
        SECRET BUTTON
      </button>
      <button type="submit" onClick={logout}>
        Log out
      </button>
    </div>
  )
}

/*const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secret,
      })
    )
  }

  const loginFailed = (loginError) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginError
      })
    )
  }



  const showSecret = () => {
    fetch(SECRET_URL, {
      method: 'GET',
      headers: {Authorization: accessToken},
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Profile failed'
      }
      return res.json()
    })
    .then((json) => loginSuccess(json))
    .catch((err) => loginFailed(err))
  }
  */