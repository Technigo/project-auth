import React, { useEffect } from 'react'
import { useSelector/* , useDispatch *//* , batch */ } from 'react-redux'
import { useHistory/* , Link */ } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

const SecretPage = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  /* const dispatch = useDispatch() */
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/')
    } else if (accessToken) {
      history.push('/secret')
    }
  }, [accessToken, history])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

  fetch(API_URL('secret'), options)
    .then(res => res.json())
    .then(data => data)
  }, [accessToken])

  return (
    <>
      <h1>SECRET</h1>
    </>
  )
}

export default SecretPage