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


/*     const [newUser, setNewUser] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const signUpData = {
            email: email,
            username: username,
            password: password
        };

        if (email && username && password) {
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Registration failed');
                    }
                    return response.json();
                })
                .then((data) => setNewUser(data.id))
                .catch((error) => console.error('Registration failed', error));
        }
    }, [email, username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    } */

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
                            id="email"
                            /* value={email}
                            onChange={(e) => setEmail(e.target.value)} */ />
                        <label htmlFor="username">Choose a username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                           /*  value={username}
                            onChange={(e) => setUsername(e.target.value)} */ />
                        <label htmlFor="password">Choose a password</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            /* value={password}
                            onChange={(e) => setPassword(e.target.value)} */ />
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