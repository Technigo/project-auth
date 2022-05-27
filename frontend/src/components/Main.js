import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import user from '../reducers/user'
import { API_URL } from '../utils/utils'

// import { jokes } from '../reducers/jokes'

export const Main = () => {
  // const jokesItems = useSelector((store) => store.jokes.items)
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

      localStorage.removeItem('user')
    })
  }

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken])

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

  //////----- testar att ta bort detta
  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: accessToken,
  //     },
  //   }

  //   fetch(API_URL('jokes'), options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         dispatch(jokes.actions.setItems(data.response))
  //         dispatch(jokes.actions.setError(null))
  //       } else {
  //         dispatch(jokes.actions.setError(data.response))
  //         dispatch(jokes.actions.setItems([]))
  //       }
  //     })
  // }, [])

  return (
    <>
      <Link to='/login'> LINK TO /login</Link>
      <main className='main-container'>
        <div className='form-container'>
          <h1>Welcome {username}!</h1>
          <h3 className='header'>Secret message: {secretMessage}</h3>
          {/* <div key={jokesItems.id}>
            <h3> {jokesItems.message} </h3>
          </div> */}
          <button className='submit-button' onClick={logout}>
            Log out
          </button>
        </div>
      </main>
    </>
  )
}
