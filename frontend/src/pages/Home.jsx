import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useState } from "react";

export const Home = () => {
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Access the 'handleLogout' function from the 'userStore'.
    const storeHandleLogout = userStore((state) => state.handleLogout);

    // Use the 'useNavigate' hook to programmatically navigate between routes.
    const navigate = useNavigate();

    // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
    const { isLoggedIn, accessToken } = userStore();
    console.log(isLoggedIn);
    console.log(accessToken);

    // useEffect hook to check user authentication status.
    useEffect(() => {
        if (!isLoggedIn) {
            // If the user is not logged in, show an alert and navigate to the login route.
            alert("Login to access");
            navigate("/"); // You can change this to the login route
        }
    }, [isLoggedIn, navigate]);

    // Function to handle the click event of the logout button.
    const onLogoutClick = () => {
        storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
        // Additional logic after logout can be added here.
        alert("Log out successful");
        navigate("/");
    };

    useEffect(() => {
        // Fetch ads from the backend API
        fetch(`/api/ads?page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => setAds(data))
            .catch((error) => console.error(error));
    }, [currentPage]);

    return (
        <>
            <button onClick={onLogoutClick}>Sign Out</button>
            <div className="advert-section">
                <h1>Advertisements</h1>
                {ads.map((ad) => (
                    <div key={ad._id}>
                        {/* Display ad details */}
                        <img src={ad.imageUrl} alt={ad.description} />
                        <p>{ad.description}</p>
                        {/* Other details like size, model, price, etc. */}
                    </div>
                ))}
                {/* Pagination controls */}
                <button onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>Previous</button>
                <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>Next</button>
            </div>
        </>
    )
}
