/* import "../index.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const SignUp = () => {
    const [newUser, setNewUser] = useState('')
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
                fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpData)
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Sign-up request failed');
                        }
                        return response.json();
                    })
                    .then((data) => setNewUser(data.id))
                    .catch((error) => console.error('Registration failed', error));
            }
        }, [email, username, password]); // Run this effect whenever email, username, or password changes

        const handleSubmit = async (e) => {
            e.preventDefault();
        }

            return (
                <>
                    <div className="signUp">
                        <h3>Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="addEmail">E-mail</label>
                            <input
                                type="text"
                                name="addEmail"
                                id="addEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="chooseUername">Choose a username</label>
                            <input
                                type="text"
                                name="chooseUsername"
                                id="chooseUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="choosePassword">Choose a password</label>
                            <input
                                type="text"
                                name="choosePassword"
                                id="choosePassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Sign up</button>
                        </form>
                        <Link to="/"><button>Go back</button></Link>
                    </div>
                </>
            )
        }

export default SignUp */