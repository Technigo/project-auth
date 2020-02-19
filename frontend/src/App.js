import React, {useState} from 'react' 

import {SignUpForm} from 'components/SignUpForm'
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
    <>
      <div className='backgroundContainer'>
      <SignUpForm/>
      </div>
    </>
  )
}
