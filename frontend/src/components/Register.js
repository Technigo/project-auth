import React from "react";
import styled from "styled-components";
import { Button } from "./Buttons";

const Register = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword ] = useState("")

    return (
      <FormSection>
        <h1>Sign up</h1>
        <Form>
            <input type="text" placeholder="username"></input>
            <input type="text" placeholder="password"></input>
        </Form> 
        <Button type="submit">Sign up</Button>
      </FormSection>
    )
}
export default Register

export const FormSection = styled.section`
  background-color: #FFEEE3;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    padding: 15px;
    margin: 5px;
    border-radius: 10px;
    border: none;
  }
`