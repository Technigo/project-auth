
import { Login } from "../components/Login"
import { SignUp } from "../components/SignUp"
import { userStore } from "../stores/userStore"
import { Secret } from "../components/Secret"

export const Landingpage = () => {
    const { isLoggedIn } = userStore
    return (
        <div>
            {isLoggedIn ? (
                <Secret />
            ) : (
                <>
                    <p>I'm in Landingpage.jsx</p>
                    <SignUp />
                    <Login />
                </>
            )}
        </div>
    );
}
