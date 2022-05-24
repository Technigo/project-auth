import React from 'react';

const LandingPage = () => {
  return (
    <section className='welcome-container'>
      <h2>Welcome!</h2>
      <p>If you're a member, please login by clicking "Sign in" button below</p>
      <p>If you're not a member, please sign up by clicking "Sign up" button below</p>
      <div className='button-container'>
          <button 
              className='sign-up-btn'
              // onClick='{onSignUpBtn}'
            >
            Sign Up
            </button>
            <button 
              className='sign-up-btn'
              // onClick='{onSignIpBtn}'
            >
            Sign In
            </button>
      </div>
    </section>
  )
}

export default LandingPage;
