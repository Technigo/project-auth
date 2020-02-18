import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import { auth } from '../reducers/auth'





const url = process.env.API_URL || 'http://localhost:8080'

export const LoggedInArea = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.auth.user.accessToken)
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`${url}/`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.json())
        }
      })
      .then(json => {
        setData(json)
      })
      .catch(err => {
        dispatch(auth.actions.logOutUser())
      })

  }, [accessToken, dispatch])


  return (
    <div>
      <h2>LoggedInArea</h2>
      <ul>
        {data.map((item, index) =>
          (<li key={index}>{item}</li>)
        )}
      </ul>
      <Button disableElevation variant="contained" color="primary" type="button" onClick={() => dispatch(auth.actions.logOutUser())}>Sign out</Button>

    </div>
  )

}