// Import necessary modules and components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Secret from "./pages/Secret";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        // UserProvider wraps the entire app to provide user context to all components
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route
                        path="/"
                        element={(
                            <PrivateRoute>
                                <Secret />
                            </PrivateRoute>
                        )}
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;