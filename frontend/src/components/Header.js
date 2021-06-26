import React from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'

import user from '../reducers/user'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
    localStorage.removeItem("user")
 }

  return (
    <header>
      {accessToken && <Button 
        fullWidth
        color="primary" 
        onClick={onButtonClick}>Logout
        </Button>
      }
    </header>
  )
}

export default Header