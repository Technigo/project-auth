import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button.jsx"

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
    navigate("/signin")
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>You have successfully logged in!</h1>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  )
}
