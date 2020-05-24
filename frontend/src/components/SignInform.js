import React from 'react'

export const SignInfrom = () => {

    return (

        <article>

          <h1>Sign in</h1>

          <from>

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

          </from>


        </article>


    )

}