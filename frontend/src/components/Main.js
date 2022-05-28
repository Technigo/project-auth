import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import song from '../img/song.gif'

import user from 'reducers/user'

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken])

  return (
    <div className="main-container">
      <h1>Hello! Glad you could make it!</h1>
      <img className="song" src={song} />
      <button
        className="button-container"
        onClick={() => {
          navigate('/login')
          dispatch(user.actions.setAccessToken(null))
        }}
      >
        Log out
      </button>
    </div>
  )
}

export default Main
