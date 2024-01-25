import "../index.css"
import { userStore } from "../stores/userStore.jsx";
import { quoteStore } from "../stores/quoteStore.jsx";
/* import { useStore } from "zustand" */
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export const LoggedIn = () => {
    const storeHandleLogout = userStore((state) => state.handleLogout);
    const navigate = useNavigate();

    const { quotes, fetchQuotes } = useStore(quoteStore);

    useEffect(() => {
        console.log("Quotes array:", quotes);
        // Fetch dogs when the component mounts
        fetchQuotes();
    }, []);

    // Handle the click event of the logout button
    const onLogoutClick = () => {
        storeHandleLogout();
        alert("Logout successful");
        // Navigate to the homepage if logout was successful
        navigate("/");
    };

    return (
        <>
        <div className="mainContainer">
            <div className="loggedIn">
                <h1>Welcome!</h1>
                <h3>Here's a little thought for today:</h3>
                <h3>{quotes.length > 0 ? `${quotes[0].quote}` : "Couldn't find a quote."}</h3>
                <div className="buttonContainer">
                    <button onClick={onLogoutClick} className="logOut">Log out</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default LoggedIn