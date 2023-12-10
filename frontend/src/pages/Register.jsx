import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
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
                body: JSON.stringify({ userName, email, password }),
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
            <input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p>Something went wrong!</p>}
            <button disabled={loading} onClick={handleRegister}>Register</button>
            <Link to="/signin">Sign In</Link>
        </div>
    )
};

export default Register;    
