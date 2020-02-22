import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' 

import {SignUpForm} from 'components/SignUpForm'
import {SignInForm} from 'components/SignInForm'
import {FirstPage} from 'components/FirstPage'
import {Secrets} from 'components/Secrets'
import {NavBar} from 'components/NavBar'


import './app.css'


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
      <Route path="/sessions" exact>

      <SignInForm/>
      </Route>
      <Secrets />

    

      </Switch>
      </main>
      
      </BrowserRouter> 

  )
}
