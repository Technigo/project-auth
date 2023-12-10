// Import necessary modules and components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Secret from "./pages/Secret";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";

// Define App component
const App = () => {
    // Render App component
    return (
        // UserProvider wraps the entire app to provide user context to all components
        <UserProvider>
            {/* Router component wraps the Routes to provide routing functionality */}
            <Router>
                {/* Routes component wraps all Route components */}
                <Routes>
                    {/* Route for /register path, renders Register component */}
                    <Route path="/register" element={<Register />} />
                    {/* Route for /signin path, renders SignIn component */}
                    <Route path="/signin" element={<SignIn />} />
                    {/* Route for / path, renders Secret component wrapped in PrivateRoute component */}
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

// Export App component
export default App;