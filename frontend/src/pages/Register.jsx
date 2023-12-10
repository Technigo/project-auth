import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

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
        <Card>
            <Input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className="mb-4" placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            {error && <p>Something went wrong!</p>}
            <div className="flex justify-between items-center">
                <Button disabled={loading} onClick={handleRegister}>Register</Button>
                <Link className="text-pink-500" to="/signin">Sign In</Link>
            </div>
        </Card>
    )
};

export default Register;    
