import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSignIn = async () => {
        try {
            setError(false);
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                signIn(userData);
                navigate("/");
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

    return (
        <div>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error === true && <p>Something went wrong!</p>}
            <button disabled={loading} onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
