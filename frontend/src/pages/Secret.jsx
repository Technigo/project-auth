// Import necessary modules and components
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Card from "../components/Card";
import Button from "../components/Button";

const Secret = () => {
    // Get user and signOut function from User context
    const { user, signOut } = useUser();
    // Get navigate function from react-router
    const navigate = useNavigate();

    // Initialize state variables
    const [secretMessage, setSecretMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Define handleSignOut function
    const handleSignOut = () => {
        // Sign out user and navigate to sign in page
        signOut();
        navigate("/signin")
    };

    // Use useEffect to fetch secret message when component mounts
    useEffect(() => {
        const getSecret = async () => {
            try {
                // Send GET request to /secret endpoint
                const response = await fetch(`${import.meta.env.VITE_API_URL}/secret`, {
                    method: "GET",
                    headers: {
                        // Include access token in Authorization header
                        Authorization: user.accessToken,
                    },
                });

                // If request is successful, set secret message
                if (response.ok) {
                    const secretData = await response.json();
                    setSecretMessage(secretData.message);
                } else {
                    // If request is not successful, set error state
                    setError(true);
                }
            } catch (err) {
                // If an error occurs, set error state
                setError(true);
            } finally {
                // Reset loading state
                setLoading(false);
            }
        };

        // Call getSecret function
        getSecret();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <Card>
            <h1 className="text-slate-700 text-3xl mb-2">{`Hello ${user.userName}`}</h1>
            {loading ? <Text>Loading...</Text> : <Text>{secretMessage}</Text>}
            {error && <Text>Something went wrong!</Text>}
            <Button onClick={handleSignOut}>Sign Out</Button>
        </Card>
    );
};

export default Secret;