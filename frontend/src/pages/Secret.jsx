import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Card from "../components/Card";
import Button from "../components/Button";

const Secret = () => {
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
        <Card>
            <h1 className="text-3xl mb-2 text-slate-700">{`Hello ${user.userName}`}</h1>
            {loading && (
                <Text>
                    Loading...
                </Text>
            )}
            {error && (
                <Text>
                    Something went wrong...
                </Text>
            )}
            {!loading && !error && (
                <Text>
                    {secretMessage}
                </Text>
            )}
            <Button onClick={handleSignOut}>Sign Out</Button>
        </Card >
    )
}

export default Secret;