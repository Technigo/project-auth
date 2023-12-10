// Import necessary modules
import { createContext, useContext, useState } from "react";

// Create User context
const UserContext = createContext();

const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    // Define key for storing user data in local storage
    const userStorageKey = "user";
    // Get user data from local storage
    const userInStorage = localStorage.getItem(userStorageKey);

    // Initialize user state from local storage
    const [user, setUser] = useState(userInStorage ? JSON.parse(userInStorage) : null);

    const signIn = (userData) => {
        // Store user data in local storage
        localStorage.setItem(userStorageKey, JSON.stringify(userData));
        // Update user state
        setUser(userData);
    }

    const signOut = () => {
        // Remove user data from local storage
        localStorage.removeItem(userStorageKey);
        // Update user state
        setUser(null);
    }

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

export { UserProvider, useUser };