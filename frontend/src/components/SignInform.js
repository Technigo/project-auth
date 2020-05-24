import React from 'react'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'

export const SignInfrom = () => {

    return (

        <Article>

          <From>
          <h1>Sign in</h1>

          <input
          type="email"
          placeholder="Email"
          required
          >
          </input>
          <input
          type="password"
          placeholder="Password"
          minlength="8"
          required
          >
          </input>

          <input type="submit" value="Sign up"></input>

          </From>


        </Article>


    )

}