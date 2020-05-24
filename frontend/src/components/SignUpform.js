import React from 'react'

import { Article } from '../lib/FormStyle'
import { From } from '../lib/FormStyle'
import { Input } from '../lib/FormStyle'

export const SignUpform = () => {

    return (

        <Article>

          <From>
          <h1>Sign up here</h1>

          <Input
          type="text"
          placeholder="Name"
          required
          > 
          </Input>
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