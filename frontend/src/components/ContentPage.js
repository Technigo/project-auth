import React, { useEffect, useState } from 'react'

export const ContentPage = () => {
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [showSecret, setShowSecret] = useState(false)
    const [favoriteFood, setFavoriteFood] = useState("")
    const [favoriteMovie, setFavoriteMovie] = useState("")
    const [favoriteBook, setFavoriteBook] = useState("")
    const [showSurveyMessage, setShowSurveyMessage] = useState(false)

    //Getting the accessToken from the browser's localStorage
    //and sending it as the header "Authorization"
    const accessToken = window.localStorage.getItem('accessToken')

    const showContent = () => {
        setShowSecret(true)
    }

    useEffect(() => {
        setErrorMessage('')
        fetch("https://project-auth-jmm.herokuapp.com/content", {
            method: "GET",
            headers: { "Authorization": accessToken }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Access denied')
                }
                return res.json()
            })
            .then(json => setMessage(json.message))
            .catch(err => {
                setErrorMessage(err.message)
            })
    }, [accessToken])

    if (!message) {
        return <div>… L O A D I N G …</div>
    }

    const handleFavorites = event => {
        event.preventDefault()
        fetch("https://project-auth-jmm.herokuapp.com/users", {
            method: "PUT",
            body: JSON.stringify({ favoriteFood, favoriteMovie, favoriteBook }),
            headers: { "Content-Type": "application/json", "Authorization": accessToken }
        })
            .then(() => {
                setShowSurveyMessage(true)
                setFavoriteFood("")
                setFavoriteMovie("")
                setFavoriteBook("")
            })
            .catch(err => console.log("error:", err))
    }


    return (
        <>
            <div>
                {!showSecret &&
                    <div className="welcome-sign">
                        <h1>Welcome!</h1>
                        <h3>You´ve successfully signed in!</h3>
                        <h5>{message}</h5>
                        <img className="img-checked" src="/assets/checked.png" alt="checked" />
                        <br></br>
                        <button
                            className="btn-secret"
                            onClick={showContent}
                        >
                            Show secret content
            </button>
                    </div>
                }

                {showSecret &&
                    <div className="show-secret">
                        <form>
                            <div className="form-title">Please fill in your favorites</div>
                            <div className="form-text">Favorite food</div>
                            <input
                                type="text"
                                onChange={event => setFavoriteFood(event.target.value)}
                                value={favoriteFood}
                                placeholder="Favorite food"
                            />

                            <div className="form-text">Favorite movie</div>
                            <input
                                type="text"
                                onChange={event => setFavoriteMovie(event.target.value)}
                                value={favoriteMovie}
                                placeholder="Favorite movie"
                            />

                            <div className="form-text">Favorite book</div>
                            <input
                                type="text"
                                onChange={event => setFavoriteBook(event.target.value)}
                                value={favoriteBook}
                                placeholder="Favorite Book"
                            />
                            {!showSurveyMessage &&
                                <button
                                    className="btn-submit"
                                    type="submit"
                                    onClick={handleFavorites}
                                >
                                    Submit
                </button>
                            }
                            {showSurveyMessage &&
                                <div className="form-text">Thank you for sharing your favorites!
                 You answered: Food: {favoriteFood}, Movie: {favoriteMovie} and Book:{favoriteBook}</div>
                            }

                        </form>
                    </div>
                }
            </div>
            {errorMessage && <div>{errorMessage}</div>}
        </>
    )
}