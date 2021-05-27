import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/register')
    }
  }, [accessToken])

  return (
    <div>
      <div>Welcome</div>
      <Link to="/register">To Register we go!</Link>
    </div>
  )
}

export default Main