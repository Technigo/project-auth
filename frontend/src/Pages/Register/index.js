import React, { useState } from 'react'
import { Signup } from '../../Components/Singup'
import { Signin } from 'Components/Signin'
// import { FormAside } from "../../Components/FormAside"
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'

import './register.css'


export const Register = () => {
    const [haveAccount, setHaveAccount] = useState(false);

    return (
        <>
            <Header />
            <section className='mainContainer'>

                {!haveAccount && <>
                    <button className="buttonSingUp" onClick={() => setHaveAccount(true)}>You already have an account</button>
                    < Signup />
                </>}
                {haveAccount &&
                    <>
                        < Signin />
                        <button className="buttonSingIn" onClick={() => setHaveAccount(false)}>You want to create an account</button>
                    </>}
            </section>
            <Footer />
        </>
    )
}
