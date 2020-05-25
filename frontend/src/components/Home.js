import React, { useState } from 'react'
import { SignUp } from './SignUp.js'
import { SignIn } from './SignIn.js'
import { ContentPage } from './ContentPage.js'
import { SignOut } from './SignOut'

export const Home = () => {

  const [signedIn, setSignedIn] = useState(false)

  const getIDFromLS = () => {
    const id = localStorage.getItem("userID")
    return id
  }

  return (
    <>
      {!signedIn &&
        <>
          <SignUp setSignedIn={setSignedIn} />
          <SignIn setSignedIn={setSignedIn} />
        </>
      }
      {signedIn &&
        <>
          <ContentPage id={getIDFromLS} />
          <SignOut setSignedIn={setSignedIn} />
        </>
      }
    </>
  )
}
