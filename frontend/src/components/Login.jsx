import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { getUserIdFromToken } from "../context/authHelpers"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && getUserIdFromToken(token)) {
      navigate("/thoughts")
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("Starting login process...")

      const userResponse = await axios.get(
        `https://project-auth-7ju7.onrender.com/signup?username=${username}`
      )
      console.log("User response:", userResponse.data)

      if (!userResponse.data || !userResponse.data.length) {
        alert("User does not exist. Please register first.")
        return
      }

      console.log("User exists. Proceeding with login...")

      const response = await axios.post(
        "https://project-auth-7ju7.onrender.com/login",
        {
          username,
          password,
        }
      )

      console.log("Login response:", response.data)

      localStorage.setItem("token", response.data.token)

 
      login(response.data.token)

      console.log("Login successful. Navigating to /thoughts...")
      navigate("/thoughts")
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
