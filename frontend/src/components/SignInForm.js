import React from 'react';

const SignInForm = () => {
  return (
      <section className='sign-in-container'>
          {/* <form onSubmit={onSignInSubmit}> */}
          <form>
            <p>Please type your username and password to sign in</p>
              <textarea
                  // value={username}
                  placeholder='Username'
                  rows='1'
                  cols='12'
              />
               <textarea
                  // value={password}
                  placeholder='Password'
                  rows='1'
                  cols='12'
              />
              <button 
                  className='sign-in-btn'
                  type='submit'
              >
                Sign in
              </button>
          </form>
      </section>
  )
}

export default SignInForm;
