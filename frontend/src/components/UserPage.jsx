import Lottie from "lottie-react"
import animationData from "../assets/lottie.json"
import { LogoutButton } from "./LogoutButton"

//authorize with access token from /user-page

export const UserPage = () => {
  return (
    <div className="user-page-container">
      <h2 className="user-message">Congratulations! You are logged in!</h2>
      <Lottie className="lottie" animationData={animationData} />
      <LogoutButton/>
    </div>

  )
}
