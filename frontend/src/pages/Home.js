import React, { useEffect } from 'react'
import LoginRegister from "./LoginRegister"
import Profile from "./Profile"

const token = localStorage.getItem('token');

const API_URL = process.env.API_URL || 'https://project-auth-hboqolcftq-uc.a.run.app/'

const Home = () => {

    return ( 
    <>
    <h1>Home</h1> 
    {
        token ? <Profile API_URL={API_URL} /> : <LoginRegister API_URL={API_URL} />
    }

    </>
    );
}
 
export default Home;