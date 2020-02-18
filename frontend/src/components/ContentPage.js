import React from 'react'

export const ContentPage = () => {

    const handleSignOut = event => {
        event.preventDefault()
        //make user sign out
    }

    return (
        <>
            <div className="welcome-sign">
                <h1> Welcome!</h1>
                <h3>You´ve successfully signed in!</h3>
                <img className="img-checked" src="/assets/checked.png" alt="checked" />
                <button className="btn-signout"
                    onClick={handleSignOut}>Sign out</button>
            </div>
        </>
    )
}