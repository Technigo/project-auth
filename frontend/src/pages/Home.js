import React from 'react'
import LoginRegister from "./LoginRegister"

const token = localStorage.getItem('token');


const Home = () => {
    return ( 
    <>
    <h1>Home</h1> 
    {
        token ? <h1>Data</h1> : <LoginRegister />
    }

    </>
    );
}
 
export default Home;