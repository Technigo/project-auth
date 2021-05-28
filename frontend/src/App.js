import React from 'react'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignInForm from './components/SignIn'
import SignUpForm from 'components/SignUp'
import Secret from './components/SecretPage'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
   <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/secret" component={Secret}/>
        <Route path="/signin" component={SignInForm}/>
        <Route path="/" component={SignInForm}/>
        <Route path="/signup" component={SignUpForm}/>
      </Switch>
    </Provider>
   </BrowserRouter>
  )
}
