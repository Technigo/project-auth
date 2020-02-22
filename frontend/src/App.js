import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' 

import {SignUpForm} from 'components/SignUpForm'
import {FirstPage} from 'components/FirstPage'
import {NavBar} from 'components/NavBar'

import './app.css'
import {LogInForm} from 'components/LogInForm'

//export const App = () => {
  //return (
    //<div>
      //Find me in src/app.js!
    //</div>
  //)
//}



export const App = () => {
  return (
    
    <BrowserRouter>
      <main className='backgroundContainer'>
      {/*<NavBar/>*/}
     
      
      <Switch>
      <Route path="/" exact>
      <FirstPage/>
      </Route>
      <Route path="/users" exact>
      <SignUpForm/>

      </Route>
      </Switch>
      </main>
      
      </BrowserRouter> 

  )
}
