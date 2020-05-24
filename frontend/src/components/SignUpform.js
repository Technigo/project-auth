import React from 'react'

export const SignUpform = () => {

    return (

        <article>

          <h1>Sign up here</h1>

          <from>

          <input
          type="text"
          placeholder="Name"
          required
          > 
          </input>
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