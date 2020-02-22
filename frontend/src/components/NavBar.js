import React, {useState} from 'react' ;
import { Link } from 'react-router-dom'

export const NavBar = () => {

    return(
        <div>
        <Link to='/'><button className='navBar'>home</button></Link>
        </div>
    )
}