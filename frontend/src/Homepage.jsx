import styled from "styled-components"
import { SwitchLabel } from "./SwitchLabel"
import { useNavigate } from "react-router-dom"
const StyledSection = styled.div`
  background-color: #ffd5c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
  padding: 128px 16px;
  gap: 16px;
`
const SwitchLabelWrapper = styled.div`
  cursor: pointer;
`
export const Homepage = () => {
  const navigate = useNavigate()
  const handleSwitchLabelClick = () => {
    // Redirect to the login page when switch label is clicked
    navigate("/login")
  }

  return (
    <StyledSection>
      <div className="banner">
        <img src="/rectangles.svg" alt="Background" />
      </div>
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>

      <p>Find your perfect companion</p>
      <SwitchLabelWrapper onClick={handleSwitchLabelClick}>
        <SwitchLabel />
      </SwitchLabelWrapper>
    </StyledSection>
  )
}
