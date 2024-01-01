import { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { AdsList } from "../components/AdsList";
import { CreateAd } from "../components/CreateAd";
import { ErrorMessage } from '../components/ErrorMessage';
import { SuccessMessage } from '../components/SuccessMessage';



export const Home = () => {
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    // Define text content for the heading and subheading.
    const text = {
        heading: "Welcome back!",
        subheading: "Check out the latest sneakers",
    };

    // Access the 'handleLogout' function from the 'userStore'.
    const storeHandleLogout = userStore((state) => state.handleLogout);

    // Handle error & success messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            setError("no permission - here");
            navigate("/"); // You can change this to the login route
        }
    }, [isLoggedIn, navigate]);

    // Function to handle the click event of the logout button.
    const onLogoutClick = () => {
        storeHandleLogout(); // Call the 'handleLogout' function from 'userStore'.
        // Additional logic after logout can be added here.
        setSuccess("Log out successful");
        navigate("/"); // You can change this to the login route
    };

    return (
        <>
            <button onClick={onLogoutClick}>Sign Out</button>
            <button className="toggle-dark-mode" onClick={toggleDarkMode}>
                Dark Mode
            </button>
            <h1>{text.heading}</h1>
            <h2>{text.subheading}</h2>
            {/* Display error message if there is an error */}
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            <CreateAd />
            <AdsList />
        </>
    )
};
