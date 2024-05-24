import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext)

  return (
    <Link to={"/"} onClick={logout} className="full-width">
      <button className="full-width">Log out</button>{" "}
    </Link>
  )
}
