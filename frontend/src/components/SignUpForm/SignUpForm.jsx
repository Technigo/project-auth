// import { Button } from "./Button.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SignUpForm.css"

export const SignUpForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  //Function to handle signup
  const handleSignUp = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        "https://project-auth-irev.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("accessToken", data.accessToken)
        setIsAuthenticated(true)
        navigate("/loggedin")
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message || "Could not sign up"
        setErrorMessage(errorMessage)
      }
    } catch (error) {
      console.error("Error, could not sign up:", error)
      setErrorMessage("An error occurred while signing up")
    }
  }

  const handleSignIn = () => {
    navigate("/signin")
  }

  return (
    <>
      {isAuthenticated ? (
        <p>You are already signed up and logged in.</p>
      ) : (
        <div className="signup-form">
          <div className="form-container">
            <img src="./lock.jpg" alt="Lock Icon" className="lock-image" />
            <form onSubmit={handleSignUp} className="form">
              <h3>Sign up here</h3>

              <label>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </label>

              <label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              <button type="submit" className="signup-button">
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="registered-container">
        <p>Already registered? </p>
        <button type="button" className="signin-button" onClick={handleSignIn}>
          Sign in here
        </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  )
}
