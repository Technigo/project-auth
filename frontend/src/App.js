import React, {useState} from 'react'
import {Registration} from 'components/Registration'
import {Signin} from 'components/Signin'
import {ContentPage} from 'components/ContentPage'

export const App = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [showContentPage, setShowContentPage] = useState(false)
  
  const clickSignin = () => {
    setShowRegister(false)
  }

  const clickRegister = () => {
    setShowRegister(true)
  }

  const handleSignOut = event => {
    event.preventDefault()
    //make user sign out
    setShowForm(true)
    setShowContentPage(false)
}

  return (
    <div>
      {showForm && 
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
      }
      {showContentPage && 
        <div className="welcome-sign">
          <ContentPage/>
          <button className="btn-signout" type="button"
          onClick={handleSignOut}>Sign out</button>
        </div>
      }
    </div>
  )
}
