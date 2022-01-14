import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from 'utils/urls';
import thoughts from '../reducers/thoughts'
import user from '../reducers/user'

export const Main = () => {
// this comp available only for users, secret compo
  const thoughtsItems = useSelector(store => store.thoughts.items)
  // hämtar accesstoken from resux store 
  const accessToken = useSelector(store => store.user.accessToken)
  const username = useSelector(store => store.user.username)
  console.log(username)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      }
    }
  
    fetch(API_URL('thoughts'), options)
      .then(res => res.json())
      .then((data) => {
        if(data.success) {
          dispatch(thoughts.actions.setItems(data.response))
          dispatch(thoughts.actions.setError(null))
        } else {
          dispatch(thoughts.actions.setItems([]))
          dispatch(thoughts.actions.setError(data.response))
        }
      })
  }, [accessToken, dispatch])

  const logOut = () => {
    dispatch(user.actions.setAccessToken(null))
    navigate('/login')
  }

  return (
    <div className="wrapper"> 
      <h3>Here are your protected quotes, {username}</h3>
      {thoughtsItems.map(item => (
        <p className="quote" key={item._id}>{item.message}</p>
      ))}
    <button type="button" onClick={logOut}>Log out</button>
    </div>
  )
}
