import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const useUser = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const userStorageKey = "user";
    const userInStorage = localStorage.getItem(userStorageKey);

    const [user, setUser] = useState(userInStorage ? JSON.parse(userInStorage) : null);

    const signIn = (userData) => {
        localStorage.setItem(userStorageKey, JSON.stringify(userData));
        setUser(userData);
    }

    const signOut = () => {
        localStorage.removeItem(userStorageKey);
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
