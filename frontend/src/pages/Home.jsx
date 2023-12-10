import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, signOut } = useUser();
    const navigate = useNavigate();

    const [secretMessage, setSecretMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleSignOut = () => {
        signOut();
        navigate("/signin")
    };

    useEffect(() => {
        const getSecret = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/secret`, {
                    method: "GET",
                    headers: {
                        Authorization: user.accessToken,
                    },
                });

                if (response.ok) {
                    const secretData = await response.json();
                    setSecretMessage(secretData.message);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err.message);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getSecret();
    }, [user.accessToken]);

    return (
        <div>
            <h1>{`Hello ${user.userName}`}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong...</p>}
            {!loading && !error && <p>{secretMessage}</p>}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default Home;