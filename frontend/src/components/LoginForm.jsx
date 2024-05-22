//POST request to sessions with email and password
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = () => {
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
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <h2 className="title">User login </h2>
      <form className="form-container">
        <div className="input-wrapper">
          <label htmlFor="user-email"> Email adress: </label>
          <input
            onChange={handleEmailChange}
            type="text"
            id="user-email"
            placeholder="example@email.com"></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="user-password">Password: </label>
          <input
            onChange={handlePasswordChange}
            type="password"
            id="user-password"></input>
        </div>
        <button className="full-width" onClick={login}>
          Login
        </button>
      </form>
      <Link to={"/"}>
        <a className="back-link">
          <IoIosArrowBack />
          Back to first page
        </a>
      </Link>
    </>
  )
}
