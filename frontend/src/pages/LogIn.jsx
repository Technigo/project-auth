import "../index.css"
import { Link } from "react-router-dom"
import { userStore } from '../stores/userStore.jsx'
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
    const { handleLogin } = userStore();
    const navigate = useNavigate();

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            await handleLogin(username, password);
            navigate('/loggedIn');
        } catch (error) {
            console.error('Login error:', error);
        }

    };

    return (
        <>
            <div className="logIn">
                <h3>Log In</h3>
                <form onSubmit={handleLoginFormSubmit}>
                    <label for="email">E-mail</label>
                    <input type="text" name="email" id="email" />
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Log in</button>
                </form>
                <Link to="/"><button>Go back</button></Link>
            </div>
        </>
    )
}

export default LogIn