import "../index.css"
import { Link } from "react-router-dom"

export const LogIn = () => {
    return (
        <>
        <div className="logIn">
            <h3>Log In</h3>
            <form>
                <label for="email">E-mail</label>
                <input type="text" name="email" id="email" />
                <label for="password">Password</label>
                <input type="text" name="password" id="password" />
            </form>
            <Link to="/"><button>Go back</button></Link>
        </div>
        </>
    )
}

export default LogIn