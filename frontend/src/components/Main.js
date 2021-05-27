import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import secrets from '../reducers/secrets'

import { API_URL } from '../reusable/urls'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const secretItems = useSelector(store => store.secrets.items)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

    fetch(API_URL('secrets'), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(secrets.actions.setSecrets(data.secrets))
            dispatch(secrets.actions.setErrors(null))
          })
        } else {
          dispatch(secrets.actions.setErrors(data))
        }
      })
  }, [accessToken])

  return (
    <div>
      {secretItems.map(secret => (
        <div key={secret._id}>{secret.message}</div>
      ))}
    </div>
  )
}
export default Main
