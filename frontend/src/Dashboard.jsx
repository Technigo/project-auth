import styled from "styled-components"
import { SwitchLabel } from "./SwitchLabel"
import { useNavigate } from "react-router-dom"

const StyledSection = styled.div`
  background-color: #ffd5c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  padding: 128px 16px;
  gap: 16px;
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100px;
    height: auto;
    border-radius: 20px;
  }
  ul {
    display: flex;
    gap: 10px;
    list-style: none;
    align-items: center;
    flex-wrap: wrap;
  }
  li {
    text-align: center;
    padding: 5px;
  }

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
    { id: 1, name: "Buddy", img: "/dog4.jpg" },
    { id: 2, name: "Max", img: "/dog3.jpg" },
    { id: 3, name: "Bella", img: "/dog2.jpg" },
    { id: 4, name: "Roy", img: "/rottie.jpg" },
  ]
  const handleLogOut = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
        localStorage.removeItem("accessToken")

        navigate("/login")
      } else {
        console.error("No access token found")
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }
  // const handleLogOut = async () => {

  // try {
  //   const response = await fetch(`${process.env.REACT_APP_API_KEY}/logout`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })

  //   if (response.ok) {
  //     localStorage.removeItem("accessToken")
  //     navigate("/login")
  //   } else {
  //     console.error("Logout failed:", response.statusText)
  //   }
  // } catch (error) {
  //   console.error("Error logging out:", error)
  // }

  return (
    <StyledSection>
      <h1>Your Dogs 🐶</h1>
      <ul>
        {adoptedDogs.map((dog) => (
          <div>
            <li key={dog.id}>{dog.name}</li>
            <img src={dog.img} alt="dog-image" />
          </div>
        ))}
      </ul>
      <section>
        <p>Rest of content coming soon...</p>
      </section>
      <SwitchLabelWrapper onChange={handleLogOut}>
        <SwitchLabel />
      </SwitchLabelWrapper>
    </StyledSection>
  )
}
