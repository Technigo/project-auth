import { useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
const API_KEY = "https://project-auth-2qfo.onrender.com"
import { SwitchLabel } from "./SwitchLabel"

const RegistrationContainer = styled.div`
  background-color: #ffd5c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  padding: 128px 16px;
`

const RegistrationFormStyled = styled.form`
  background-color: #ffd5c5;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-bottom: 20px;
  align-items: center;

  label {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 5px;
  }

  input {
    font-size: 15px;
    border-radius: 70px;
    padding: 10px;
    margin-bottom: 15px;
    width: 100%;
    text-align: center;
    outline: none;
    border: none;
  }

  button {
    background-color: white;
    border: none;
    border-radius: 70px;
    font-size: 15px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`

export const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_KEY}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        const accessToken = data.accessToken
        localStorage.setItem("accessToken", accessToken)

        navigate("/secrets")
      } else {
        console.error("Login failed:", response.statusText)
      }
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }
  const SwitchLabelWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  `

  return (
    <RegistrationContainer>
      <h2>UserLogin</h2>
      <h2>Welcome Back!</h2>
      <RegistrationFormStyled onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Email"
          placeholder="Your Email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          aria-label="Password"
          placeholder="Your Password"
        />

        <SwitchLabelWrapper onClick={handleSubmit}>
          <SwitchLabel />
        </SwitchLabelWrapper>
      </RegistrationFormStyled>
      <span>
        Not registered yet? <Link to="/registration">Sign Up</Link>
      </span>
    </RegistrationContainer>
  )
}
