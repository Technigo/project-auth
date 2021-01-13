import React, { useState } from 'react'
import { Provider } from 'react-redux'

import { Status } from './components/Status'
import { Profile } from './components/Profile'
import { LoginForm } from './components/LoginForm'
import { user } from './reducers/user'

//const URL = https://project-auth-cla-ellen.herokuapp.com/
const URL = 'http://localhost:8080/users'

export const App = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  //sign-in user
  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({name, password}),
      headers: { "Content-Type" : "application/json" }
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log("error:", err ))
  }

  return (
    <Provider store={store}>
      <Status />
      <Profile />
      <LoginForm />
    </Provider>
  )
}
