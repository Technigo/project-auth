import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://project-auth-7ju7.onrender.com/signup", {
        username,
        password,
      })
      navigate("/login")
    } catch (error) {
      console.error(error)
      alert("Registration failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
