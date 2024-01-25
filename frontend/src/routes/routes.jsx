import { Route } from "react-router-dom"
import { Home } from "../pages/Home.jsx"
import { SignUp } from "../pages/SignUp.jsx"
import { LogIn } from "../pages/LogIn.jsx"

const routes = (
    <>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/loggedIn" element={<LoggedIn />} />
    </>
)

export default routes