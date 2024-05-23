import styled from "styled-components"
import { SwitchLabel } from "./SwitchLabel"
import { Link, useNavigate } from "react-router-dom"
const API_KEY = "https://project-auth-2qfo.onrender.com"

const StyledSection = styled.div`
  background-color: #ffd5c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  padding: 128px 16px;
  gap: 16px;
  section {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`
const SwitchLabelWrapper = styled.div`
  cursor: pointer;
`

export const Dashboard = () => {
  const navigate = useNavigate()
  // Dummy data for adopted dogs
  const adoptedDogs = [
    { id: 1, name: "Buddy" },
    { id: 2, name: "Max" },
    { id: 3, name: "Bella" },
  ]

  const handleLogOut = async () => {
    try {
      // Send a request to invalidate the access token
      const response = await fetch(`${API_KEY}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      if (response.ok) {
        // Remove the access token from local storage
        localStorage.removeItem("accessToken")
        // Redirect the user to the login page
        navigate("/login")
      } else {
        console.error("Logout failed:", response.statusText)
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <StyledSection>
      <h1>Your Adopted Dogs</h1>
      <ul>
        {adoptedDogs.map((dog) => (
          <li key={dog.id}>{dog.name}</li>
        ))}
      </ul>
      <section>
        <h2>Find a New Friend</h2>
        <p>Explore our available dogs and find your new furry friend!</p>
        <Link to="/">Rest of content coming soon...</Link>
      </section>
      <SwitchLabelWrapper onChange={handleLogOut}>
        <SwitchLabel />
      </SwitchLabelWrapper>
    </StyledSection>
  )
}
