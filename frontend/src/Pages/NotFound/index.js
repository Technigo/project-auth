import React from 'react';
import Lottie from "react-lottie";
import animationData from "../../lotties/notFound.json";
import { Link } from 'react-router-dom'
import './notFound.css'

export const NotFound = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <section className="notFoundContainer">
            <Link to="/" className="header-back">
                <i className="fas fa-chevron-circle-left"></i>Home
            </Link>
            <div className="lottie">
                <Lottie options={defaultOptions} width={600} />
            </div>
        </section>
    );
}