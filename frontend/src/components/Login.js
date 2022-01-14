import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../utils/urls"
import user from "../reducers/user"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signup") // either for signup or signin
  const [validationError, setValidationError] = useState(null)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }
  }, [accessToken, navigate])

  //to send a request to backend
  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          // without batch, redux dispatches and updates this tree lines step by step
          // from the performance point of view we use batch package
          // to combine many dispatches to send in the same time to do it only one time
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
            setValidationError(null)
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
          setValidationError(data.message)
        }
      })
  }

  return (
    <section className="container">
      <div className="header">
        <h1>Sign up or Sign in </h1>
        <h3>to see the message! </h3>
      </div>

      <div className="radioButtons">
        <div className="radioWrapper">
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
          <label htmlFor="signup">Sign up</label>
        </div>

        <div className="radioWrapper">
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
          <label htmlFor="signin">Sign in</label>
        </div>
      </div>
      <form onSubmit={onFormSubmit}>
        <input
          className="inputField"
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputField"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* if we have error -> display it */}
        {validationError !== null && (
          <p className="error-message">{validationError}</p>
        )}
        {/* <button type="submit">Submit</button> */}
        {mode === "signup" ? (
          <button disabled={username.length < 5} type="submit">
            Create user
          </button>
        ) : (
          <button disabled={username.length < 5} type="submit">
            Login
          </button>
        )}
      </form>
    </section>
  )
}

export default Login
