import React from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Link } from 'react-router-dom'


import './home.css'
import { Aside } from 'Components/Aside'

export const Home = () => {

    return (
        <>
            <Header />
            <section className='mainContainer'>
                <Aside render={<><h1>Found the info about your favorite series</h1><h1><Link to="/register"> Sign up for free</Link></h1></>} />
                <img className='mainImage' src="./assets/characters-My-Hero-Academia-Wallpaper-HD-for-PC-scaled.jpeg" alt="characters" />
            </section>
            <Footer />
        </>
    )
}