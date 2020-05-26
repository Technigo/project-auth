import React, { useState } from 'react'
import { LoginForm } from "./components/LoginForm"


// const URL = "http://localhost:8080/users";

export const App = () => {

  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = event => {
  //   event.preventDefault()

  //   fetch(URL, {
  //     method: "POST",
  //     body: JSON.stringify({ name, password }), //getting name and password from backend
  //     headers: { "Content-Type": "application/json" }
  //   })
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  //     .catch(err => console.log("error:", err))
  // }

  return (
    <LoginForm /*handleSubmit={handleSubmit} */ />
  )
}
