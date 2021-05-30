import React from 'react'
// import styled from 'styled-components'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { thoughts } from './reducers/thoughts'
import { user } from './reducers/user'

import {Thoughts} from './components/Thoughts'
import {RegistrationForm} from './components/RegistrationForm'


const reducer = combineReducers ({
  thoughts: thoughts.reducer,
  user: user.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <>
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={RegistrationForm} />
          <Route path='/registration' component={RegistrationForm} />
          <Route path='/thoughts' component={Thoughts} /> 
        </Switch>
      </Provider>
    </BrowserRouter>
    </>
  )
}