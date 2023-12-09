import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;