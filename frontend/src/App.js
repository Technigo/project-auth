import React from 'react'

// components
import { SignUpform } from './components/SignUpform'
import { SignInform } from './components/SignInform'

// lib
import { Card } from './lib/Card'



export const App = () => {
  return (
    <Card>

           <SignUpform />
           <SignInform  /> 

    </Card>
  )
}


