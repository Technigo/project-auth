import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: localStorage.getItem("accessToken"),
  })

  const login = (user, accessToken) => {
    localStorage.setItem("accessToken, accessToken")
    setAuthState({
      isAuthenticated: true,
      user,
      accessToken,
    })
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    })
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken")
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/user-page", {
            headers: {
              Authorization: token,
            },
          })
          if (response.ok) {
            const data = await response.json()
            setAuthState({
              isAuthenticated: true,
              user: data.user,
              accessToken: token,
            })
          } else {
            logout()
          }
        } catch (error) {
          console.error("Failed to fetch user data", error)
          logout()
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
