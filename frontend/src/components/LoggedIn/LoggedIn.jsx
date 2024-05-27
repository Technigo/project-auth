import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import animationData from "../LoggedIn/Animation.json"
import "./LoggedIn.css"

export const LoggedIn = () => {
  //State to see if user is logged in or not based on authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      setIsLoggedIn(true) //If there is an accesstoken, isLoggedIn is set to true
    } else {
      navigate("/signin") //If there is no accesstoken, navigate to signin
    }
  }, [navigate])

  //Function to handle signout
  const handleSignOut = () => {
    localStorage.removeItem("accessToken") //Remove saved accessToken
    setIsLoggedIn(false)
    navigate("/signup")
  }

  return (
    <div className="loggedin-container">
      {isLoggedIn ? (
        <>
          <h2>You have successfully logged in!</h2>
          <Lottie animationData={animationData} />
          <button onClick={handleSignOut} className="signout-button">
            Sign Out
          </button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  )
}
