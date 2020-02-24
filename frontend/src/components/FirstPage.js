import React, {useState} from 'react' ;
import { Link } from 'react-router-dom'
import { SignUpForm } from './SignUpForm';

export const FirstPage = () => {
  
return (
    <>
        <div className='firstPage'>
            <h1 className='header'>WELCOME</h1>
            <div className='btn-Container-firtsPage'>
                <Link to='/users'><button className='btn-firstPage'>sign up</button></Link>
                <Link to='/sessions'><button className='btn-firstPage'>sign in</button></Link>
            </div>
        </div>
    </>
    
)
}
