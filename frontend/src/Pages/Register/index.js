import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { Signup } from '../../Components/Singup'
import { Signin } from 'Components/Signin'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'

import './register.css'


export const Register = () => {
    const [haveAccount, setHaveAccount] = useState(false);

    return (
        <>
            <Header />
            <section className='mainContainer'>

                <div className="returnHome">
                    <Link className="ancor-back" to="/"><i className="fas fa-chevron-circle-left"></i>Home</Link>
                </div>

                {!haveAccount && <>
                    <button className="buttonSingUp" onClick={() => setHaveAccount(true)}>You already have an account</button>
                    < Signup />
                </>}
                {haveAccount &&
                    <>
                        <button className="buttonSingIn" onClick={() => setHaveAccount(false)}>You want to create an account</button>
                        < Signin />
                    </>}
            </section>
            <Footer />
        </>
    )
}
