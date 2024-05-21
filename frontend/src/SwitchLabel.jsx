import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const StyledSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    border: none;
    border-radius: 70px;
    width: 100%;
    font-size: 15px;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff82;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-image: url("/svg-edited.svg");
    background-color: black;
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: center;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: white;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px white;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(48px);
    -ms-transform: translateX(48px);
    transform: translateX(48px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
    text-align: right;
    font-size: 9px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`

export const SwitchLabel = () => {
  const [isChecked, setIsChecked] = useState(false)
  const location = useLocation()

  let labelText = ""
  switch (location.pathname) {
    case "/":
      labelText = "Start"
      break
    case "/registration":
      labelText = "Register"
      break
    case "/login":
      labelText = "Login"
      break
    case "/secrets":
      labelText = "LogOut"
      break
    default:
      labelText = ""
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <StyledSwitchLabel>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="slider round">{isChecked ? "" : labelText}</span>
    </StyledSwitchLabel>
  )
}
