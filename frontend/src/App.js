import React, {useState} from 'react'
import Login from './components/Login'
import MemberPage from './components/MemberPage'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Registration from './components/Registration' // Van´s LoginForm

const URL = 'http://localhost:8080/users'

export const App = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  // To sign up a user.
  const handleFormSubmit = event => {
    event.preventDefault()

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name, password}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log('error:', err))
  }

  return (
    <BrowserRouter>
      <Switch>
      {/* Route for Singing up new member and logging in exicsting member */}
        <Route path="/">
        <div className="authContainer">
          <Registration />
          <Login />
        </div>
        </Route>
        {/* Route for memberpage   */}
        <Route path="/MemberPage">
          <MemberPage />
        </Route>
      
      </Switch>
    </BrowserRouter>
  )
}
