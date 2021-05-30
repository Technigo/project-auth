/* eslint-disable linebreak-style */

import React from 'react'
import { batch, useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'
import notes from '../reducers/notes'

import './header.css'

const Header = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(notes.actions.setNotes([]))

      localStorage.removeItem('user')
    })
  }
  return (
    <header>
      {accessToken && <button className="btn-logout" onClick={onButtonClick}>Logout</button>}
            
    </header>
  )
}

export default Header