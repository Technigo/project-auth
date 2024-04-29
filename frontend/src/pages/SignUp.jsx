import "../index.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { userStore } from "../stores/userStore"

export const SignUp = () => {
    const { handleSignup } = userStore();
    const navigate = useNavigate();

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            await handleSignup(email, username, password);
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    return (
        <>
            <div className="mainContainer">
                <div className="signUp">
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSignUpSubmit}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            name="email"
                            id="email" />
                        <label htmlFor="username">Choose a username</label>
                        <input
                            type="text"
                            name="username"
                            id="username" />
                        <label htmlFor="password">Choose a password</label>
                        <input
                            type="password"
                            name="password"
                            id="password" />
                        <button type="submit">Sign up</button>
                    </form>
                    <div className="buttonContainer">
                        <Link to="/"><button>Go back</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp 