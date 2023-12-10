// Import necessary modules
import { createContext, useContext, useState } from "react";

// Create User context
const UserContext = createContext();

// Define useUser hook
const useUser = () => {
    return useContext(UserContext);
};

// Define UserProvider component
const UserProvider = ({ children }) => {
    // Define key for storing user data in local storage
    const userStorageKey = "user";
    // Get user data from local storage
    const userInStorage = localStorage.getItem(userStorageKey);

    // Initialize user state from local storage
    const [user, setUser] = useState(userInStorage ? JSON.parse(userInStorage) : null);

    // Define signIn function
    const signIn = (userData) => {
        // Store user data in local storage
        localStorage.setItem(userStorageKey, JSON.stringify(userData));
        // Update user state
        setUser(userData);
    }

    // Define signOut function
    const signOut = () => {
        // Remove user data from local storage
        localStorage.removeItem(userStorageKey);
        // Update user state
        setUser(null);
    }

    // Render UserProvider component
    return (
        <UserContext.Provider
            value={{
                user,
                signIn,
                signOut,
                isSignedIn: user !== null,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Export UserProvider component and useUser hook
export { UserProvider, useUser };