import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import dogImg from '../Assets/dogs_surprised.jpeg'



const Main = () => {

  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()


  // const options = {
  //   method: 'GET',
  //   headers: {
  //     Authorization: accessToken
  //   }
  // }




// useEffect(() => {
  
//   if (!accessToken) {
//     navigate('/login')
//   }
// }, [accessToken, navigate])


  return (
    <div className="wrapper">
      {/* <Link to="/login">To sign in</Link> */}
     <h1> Huh!? Who are you??? </h1>
    <img src={dogImg}></img>

    <h1> This is our crib! </h1>

     <button onClick={() => window.location.reload()}>Sorry! Leaving now...</button>

    </div>
  )
}

export default Main