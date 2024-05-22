import { Link } from "react-router-dom"
import "./WelcomePage.css"

export const WelcomePage = () => {
  return (
    <div>
      <h2 className="title">Are you ready to get started?</h2>
      <div className="welcome-buttons">
        <Link to={"/registration"}>
          <button>Register</button>
        </Link>
        <Link to={"/login"}>
          <button>Log in</button>
        </Link>
      </div>
    </div>
  )
}
