import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async () => {
        try {
            setError(false);
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
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
            <input placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error === true && <p>Something went wrong!</p>}
            <button disabled={loading} onClick={handleRegister}>Register</button>
        </div>
    )
};

export default Register;    
