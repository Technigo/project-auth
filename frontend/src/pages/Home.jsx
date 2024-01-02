import { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { CreateAd } from "../components/CreateAd";
import { ErrorMessage } from '../components/reusableComponents/ErrorMessage';
import { SuccessMessage } from '../components/reusableComponents/SuccessMessage';
import { AdsList } from "../components/AdsList";
import { Navbar } from "../components/reusableComponents/Navigation/NavBar";
import { Heading } from "../components/reusableComponents/Heading";

export const Home = () => {
    const [showCreateAd, setShowCreateAd] = useState(false);

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

    // Function to toggle the CreateAd component
    const toggleCreateAd = () => {
        console.log("Heading clicked"); // Debugging log
        setShowCreateAd(!showCreateAd);
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={onLogoutClick} />
            <Heading level={2} text="Welcome back!" />
            <Heading level={3} text="Check out the latest sneakers" />
            <AdsList />
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            <Heading
                level={3}
                text="Share your sneakers with others"
                onClick={toggleCreateAd}
                style={{ cursor: 'pointer' }} // Optional: change cursor to indicate clickable
            />
            {showCreateAd && <CreateAd />}
        </>
    );
};