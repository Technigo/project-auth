import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import './Main.css'

import user from '../reducers/user'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const handleLogOut = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem('user')
    })
  }

  return (
    <div className="main-container">
      <div className="backend-text-container">
      <h1 className="backend-text">The back end!</h1>
      </div>
      <Link className="link-to-register" to="/">To Register we go!</Link>
      <img className="machines-illustration" src="./assets/backend.gif" alt="communicating machines illustration" />
      <div className="sign-out-button-container">
      <button 
        type="submit"
        className="log-out-button"  
        onClick={handleLogOut} 
      > 
          LOG OUT
      </button>
      </div>
    </div>
  )
}

export default Main


// 