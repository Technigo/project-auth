import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useState } from "react"

export const LogoutButton = () => {
  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
  }

  return (
    <>
      <button className="full-width" onClick={logout}>
        Log out
      </button>
    </>
  )
}
