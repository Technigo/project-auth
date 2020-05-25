import React, { useState } from 'react'
import { SignUp } from './SignUp.js'
import { SignIn } from './SignIn.js'
import { ContentPage } from './ContentPage.js'

export const Home = () => {

  const [signedIn, setSignedIn] = useState(false)

  const getIDFromLS = () => {
    return localStorage.getItem("userID")
  }

  return (
    <>
      {!signedIn && (
        <>
          <SignUp setSignedIn={setSignedIn} />
          <SignIn setSignedIn={setSignedIn} />
        </>
      )}
      {signedIn && <ContentPage id={getIDFromLS} />}
    </>
  )
}
