import React, {useState} from 'react'
import {Registration} from 'components/Registration'
import {Signin} from 'components/Signin'

export const App = () => {
  const [showRegister, setShowRegister] = useState(false)
  
  const clickSignin = () => {
    setShowRegister(false)
  }

  const clickRegister = () => {
    setShowRegister(true)
  }

  return (
    <div>
      <div className="btn-container">
        <button 
          className="btn-chooseform"
          onClick={clickSignin}
        > 
          Sign-in
        </button>
      
        <button 
          className="btn-chooseform"
          onClick={clickRegister}
        > 
          Register
        </button>
      </div>

      {!showRegister && 
        <Signin />
      }

      {showRegister &&
        <Registration />
      }
    </div>
  )
}
