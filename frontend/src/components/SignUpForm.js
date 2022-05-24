import React from 'react';

const SignUpForm = () => {
  return (
<section className='sign-up-container'>
          {/* <form onSubmit={onSignUpSubmit}> */}
          <form>
            <p>Please type a username and password down below. Password must be minimum of 8 characters</p>
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
                  className='sign-up-btn'
                  type='submit'
              >
                Sign up
              </button>
          </form>
      </section>
  )
}

export default SignUpForm;
