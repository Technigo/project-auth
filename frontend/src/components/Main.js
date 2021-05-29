import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import thoughts from '../reducers/thoughts'
import user from '../reducers/user'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const thoughtsItems = useSelector(store => store.thoughts.items)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if(!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

  fetch(API_URL('thoughts'), options)
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      batch(() => {
        dispatch(thoughts.actions.setThoughts(data.thoughts))
        dispatch(thoughts.actions.setErrors(null))
      })
    }else {
      dispatch(thoughts.actions.setErrors('data'))
    }
  })
  // eslint-disable-next-line
  }, [accessToken])

const onButtonClick = () => {
  batch(() => {
    dispatch(user.actions.setUsername(null))
    dispatch(user.actions.setAccessToken(null))
    dispatch(thoughts.actions.setThoughts([]))

    localStorage.removeItem('user')
  })
}  

  return (
    <div className="main-container">
      <p>Collections of thoughts from api:</p>
      {thoughtsItems.map(thought => (
        <div key={thought._id}>{thought.message}</div>
      ))}
      {accessToken && <button  onClick={onButtonClick}>Logout</button>}
    </div>
  )
}

export default Main