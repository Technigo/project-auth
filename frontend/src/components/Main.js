import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import './Main.css'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/register')
    }
  }, [accessToken, history])

  return (
    <div className="main-container">
      <div className="backend-text-container">
      <h1 className="backend-text">The back end!</h1>
      </div>
      <Link className="link-to-register" to="/register">To Register we go!</Link>
      <img className="machines-illustration" src="./assets/backend.gif" alt="communicating machines illustration" />
      <div className="sign-out-button-container">
      <button 
        type="submit"
        className="log-out-button"  
        // onClick={} Do a handleLogOut function
      > 
          LOG OUT
      </button>
      </div>
    </div>
  )
}

export default Main


// 