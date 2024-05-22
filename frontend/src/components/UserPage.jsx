import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Lottie from "lottie-react"
import { IoIosArrowBack } from "react-icons/io"
import animationData from "../assets/lottie.json"
import { AuthContext } from "../contexts/AuthContext"
import { LogoutButton } from "./LogoutButton"

//authorize with access token from /user-page

export const UserPage = () => {
  const { authState, logout } = useContext(AuthContext)
  const { isAuthenticated, user, accessToken } = authState

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPage = async () => {
      try {
        const response = await fetch("http://localhost:8080/user-page", {
          headers: {
            Authorization: accessToken,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch user page")
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        logout()
      }
    }

    if (isAuthenticated) {
      fetchUserPage()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, accessToken, logout])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div>
        You are not authorized to view this page. Please log in.
        <Link to={"/"} className="back-link">
          <IoIosArrowBack />
          Back to first page
        </Link>
      </div>
    )
  }

  return (
    <div className="user-page-container">
      <h2 className="user-message">
        Congratulations! You are logged in, {user.name}!
      </h2>
      <Lottie className="lottie" animationData={animationData} />
      <LogoutButton />
    </div>
  )
}
