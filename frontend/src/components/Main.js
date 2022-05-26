import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { API_URL } from 'utils/API'

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const infoItems = useSelector((store) => store.info.items) //what do we put here?
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }
    fetch(API_URL('info'), options) // what do we put here??
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          dispatch(info.actions.setItems(data.response))
          dispatch(info.actions.setError(null))
        } else {
          dispatch(info.actions.setError(data.response))
          dispatch(info.actions.setItems([]))
        }
      })
  }, [])

  return (
    <>
      <div className="main-container">
        <Link to="/login">Link To /login</Link>
        <h1>This is Main</h1>

        {infoItems.map((item) => {
          return <div key={item._id}>{item.message}</div>
        })}
      </div>
    </>
  )
}

export default Main
