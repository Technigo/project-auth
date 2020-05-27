import React from 'react'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'

// const LOGIN_URL = 'http://localhost:8080/sessions';

export const SignInfrom = () => {

    return (

        <Article>

          <From>
          <h1>Sign in</h1>

          <Input
          type="email"
          placeholder="Email"
          required
          >
          </Input>
          <Input
          type="password"
          placeholder="Password"
          minlength="8"
          required
          >
          </Input>

          <Input type="submit" value="Sign up"></Input>

          </From>


        </Article>


    )

}


