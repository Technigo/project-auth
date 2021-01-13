import React from "react"
import styled from "styled-components"

export const SubmitButton = ({ title, onClick, onSubmit }) => {
	return (
		<MainContainer 
			onSubmit={onSubmit} 
			onClick={onClick}>
			<TextField>
				{title}
			</TextField>
		</MainContainer>
	)
}

const MainContainer = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 40%;
	background-color: #8a383e;
	border: none;
	padding: 2px;
	margin: 3px;

	&:hover {
		background: #bb5c12;
		cursor: pointer;
	  }
`
const TextField = styled.p`
	font-family: 'Xanh Mono', monospace;
	display: flex;
  padding: 3px;
  flex-direction: column;
  justify-content: center;
	align-items: center;
	font-size: 18px;
	color: #a8c5cd;

	&:hover {
		color: #d2c5ab;
	  }
`