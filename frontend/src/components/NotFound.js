import React from 'react';
import { Link } from 'react-router-dom';
import error from "../assets/error.jpg";


const NotFound = () => {
    return (
        <>
            <section>
                <div className="form-container">
                    <h1 className="header">Page not found</h1>
                    <Link to="/">
                        <div>
                            <img className="error-img" src={error} alt="error" />
                        </div>
                        <div className="button-container">
                            <button className="back-button" type="button">Go back</button>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default NotFound;
