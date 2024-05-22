//POST request to sessions with email and password
import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { AuthContext } from "../contexts/AuthContext"

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  //New function "handlelogin" where we use login from the global state
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        //Login the user and navigate to login page
        login(data.user, data.accessToken)
        navigate("/user-page")
      } else {
        alert("Incorrect password, try again")
      }
    } catch (error) {
      console.error("Error logging in", error)
    }
  }

  /*const login = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }
    fetch(`http://localhost:8080/sessions`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.accessToken == undefined) {
          alert("Incorrect password, try again")
        } else {
          navigate("/user-page")

          console.log(response)
          console.log("Login was successful")
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }*/

  return (
    <>
      <h2 className="title">User login </h2>
      <form className="form-container" onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="user-email"> Email adress: </label>
          <input
            // onChange={handleEmailChange}
            type="text"
            id="user-email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="user-password">Password: </label>
          <input
            // onChange={handlePasswordChange}
            type="password"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button className="full-width" type="submit">
          Log in
        </button>
      </form>
      <Link to={"/"} className="back-link">
        <IoIosArrowBack />
        Back to first page
      </Link>
    </>
  )
}
