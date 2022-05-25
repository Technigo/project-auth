import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const Main = () => {

  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()


  // const options = {
  //   method: 'GET',
  //   headers: {
  //     Authorization: accessToken
  //   }
  // }

useEffect(() => {
  
  if (!accessToken) {
    navigate('/login')
  }
}, [accessToken, navigate])


  return (
    <div className="wrapper">
      <Link to="/login">To sign in</Link>
     <h1> This Homepage will soon be secret... </h1>

     <button onClick={() => window.location.reload()}>Sign out</button>

    </div>
  )
}

export default Main