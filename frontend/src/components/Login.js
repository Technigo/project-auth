import React from 'react'

export const Login = () => {
    return (
        <section>
          <form method="post">
            <label for="email">Email:
            <input type="email" name="email"></input>
            </label>
            <label>Password:
            <input type="password" name="password"> 
            </input>
            </label>
          <button type="submit">Submit</button>
          {/*<Link to={/MemberPage}><button>SIGN IN</button></Link>*/}
          </form>
       </section>
    )
  }