import styled from "styled-components/macro"

// Text 
export const Title = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
`
export const SubTitle = styled(Title)`
  font-size: 18px;
  margin-bottom: 20px;
`

// Content wrappers
export const Container = styled.main`
  background: #121212;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  width: 80%;
  max-width: 500px;
  min-height: 300px;
  padding: 20px;
  background: #fff;
`

// Form
export const Form = styled.form`
  display: grid;
  grid-row-gap: 20px;
  width: 100%;
`

export const Label = styled.label`
  width: 80%;
  font-size: 20px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputField = styled.input`
  background: transparent; 
  border: none; 
  border-bottom: 2px solid #fff;
  color: #fff;
  padding: 10px 0;
  font-size: 16px;
`

// Button
export const ButtonWrapper = styled(InputWrapper)`
  flex-direction: row; 
  justify-content: space-between;
  margin-top: 20px;
`