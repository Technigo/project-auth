import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const API_KEY = "https://project-auth-2qfo.onrender.com"

const RegistrationContainer = styled.div`
  background-color: #ffd5c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
    font-size: 25px;
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
    font-size: 25px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`

const RegisterBottomButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 70px;
  font-size: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: #e0e0e0;
  }
`

export const RegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch(`${API_KEY}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        const accessToken = data.accessToken
        localStorage.setItem("accessToken", accessToken)

        navigate("/secrets")
      } else {
        console.error("Registration failed:", response.statusText)
      }
    } catch (error) {
      console.error("Error registering:", error)
    }
  }

  return (
    <RegistrationContainer>
      <RegistrationFormStyled onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-label="Name"
          placeholder="Your Full Name"
        />

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
        <RegisterBottomButton type="submit">Register</RegisterBottomButton>
      </RegistrationFormStyled>
    </RegistrationContainer>
  )
}
