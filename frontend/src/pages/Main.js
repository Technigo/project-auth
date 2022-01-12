import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { NASA_URL } from '../utils/urls'
import user from '../reducers/user'

const Main = () => {
  const [dailySpace, setDailySpace] = useState({})

  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        headers: {
          Authorization: accessToken,
        },
      },
    }

    fetch(NASA_URL, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDailySpace(data)
      })
  }, [])
  const onRestartClick = () => {
    dispatch(user.actions.restart())
  }

  return (
    <>
      <div>
        <h1>{dailySpace.title}</h1>
        <p>{dailySpace.explanation}</p>
        <img src={`${dailySpace.url}`} />
      </div>
      <button onClick={onRestartClick}>Log out</button>
    </>
  )
}

export default Main
