import React from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setFeelings([]))

      localStorage.removeItem('user')
    })
  }

  return (
    <header>
      {accessToken && <button className="form-button sign-out" onClick={onButtonClick}>Sign out</button>}
    </header>
  )
}

export default Header