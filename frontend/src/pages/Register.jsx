import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { registerUser, username, setUsername, password, setPassword } = useUserStore();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password);
            if (username && password) {
                navigate("/");
                return;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Register for an account 🧡</h2>
            <form>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button onClick={handleRegister} type="submit">Register</button>
            </form>
        </>
    )
}
