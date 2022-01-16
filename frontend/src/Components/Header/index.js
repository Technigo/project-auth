import React from 'react'
import './header.css'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <div className="header-content">
            <h1 className="header-text">My hero academia</h1>
            <h2 className="header-text">Find all information about your favorite series</h2>

            <NavLink to="/" className="header-back">
                <i className="fas fa-chevron-circle-left"></i>Home
            </NavLink>

        </div>
    )
}