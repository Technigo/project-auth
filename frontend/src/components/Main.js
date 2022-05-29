import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../utils/utils'

export const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const secretMessage = useSelector((store) => store.user.secretMessage)
  const username = useSelector((store) => store.user.username)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Function for logout
  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
  }

  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
      }

      fetch(API_URL('secret'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setSecretMessage(data.secretMessage))
              dispatch(user.actions.setError(null))
            })
          } else {
            dispatch(user.actions.setError(data.response))
          }
        })
    }
  }, [accessToken, dispatch])

  return (
    <>
      <main className='main-container'>
        <div className='form-container'>
          <h1>Welcome {username}</h1>
          <h2 className='header'>{secretMessage}</h2>
          <iframe
            title='Old Girls'
            src='https://giphy.com/embed/MMQrQQ87G2MmY'
            width='250'
            height='250'
            frameBorder='0'
            class='giphy-embed'
            allowFullScreen
          ></iframe>
          <button className='logout-button' onClick={logout}>
            <p>Log out</p>
          </button>
        </div>
      </main>
    </>
  )
}
