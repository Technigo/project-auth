import React from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Link } from 'react-router-dom'


import './home.css'

export const Home = () => {

    return (
        <>
            <Header />
            <section className='mainContainer'>
                Found the info about your favorite series
                <Link to="/register"> Sign up for free</Link>
            </section>
            <Footer />
        </>
    )
}