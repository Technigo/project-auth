import { useState, useContext, useEffect, useCallback } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Thoughts = () => {
  const { token, logout } = useContext(AuthContext)
  const [thought, setThought] = useState("")
  const [error, setError] = useState(null)
  const [thoughtsList, setThoughtsList] = useState([])
  const navigate = useNavigate()

  const fetchThoughts = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://project-auth-7ju7.onrender.com/thoughts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setThoughtsList(response.data)
    } catch (error) {
      console.error("Failed to fetch thoughts:", error)
      setError("Failed to fetch thoughts. Please try again.")
    }
  }, [token])

  useEffect(() => {
    fetchThoughts()
  }, [fetchThoughts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://project-auth-7ju7.onrender.com/thoughts",
        { thought },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("Thought submitted:", response.data)
      setThought("")
      fetchThoughts()
    } catch (error) {
      console.error("Failed to submit thought:", error)
      setError("Failed to submit thought. Please try again.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      <h2>Thoughts</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Write your thought here..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {thoughtsList.map((thought, index) => (
          <li key={index}>{thought.text}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Thoughts
