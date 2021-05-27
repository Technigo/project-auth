import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'
import TextInput from '../components/TextInput'
import { API_URL } from '../reusable/urls'

const Wrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;`

const Form = styled.form`
display: flex;
flex-direction: column;`

const Title = styled.h1`
font-size: 40px;`

const ButtonContainer = styled.div`
display:flex;
width: 100%;
justify-content: space-between;`

const SubmitButton = styled.button`
background: white;
border: none;
box-shadow: 2px 2px 1px 2px grey;
border-radius: 5px;

&:hover{
  background: darkcyan;
  color: white;

&:active {
  box-shadow: none;
  transform: translateY(4px);
transform: translateX(4px);
}
}`

// const PathLink = styled(Link)``

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken)
    const [value, setValue] = useState({ password: '', username: ''})
    const [path, setPath] = useState('')

    const handleChange = (props) => (event) => {
        event.preventDefault()
        setValue({...value, [props]: event.target.value})
    }
    useEffect(() => {
        if (accessToken) {
          history.push('/');
        }
      }, [accessToken, history]);

      const handleSubmit = (e) => {
        e.preventDefault()
          const option = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'                
              },  
              body: JSON.stringify({
                username: value.username,
                password: value.password
              })
          }

          fetch(API_URL(path), option)
          .then((res) => res.json())
          .then(data => {
            console.log(data)
            if(data.success) 
            { 
              dispatch(user.actions.setUser({userID: data.userID, accessToken: data.accessToken, errors: null}))
            } else {
              dispatch(user.actions.setUser({errors: ""}))
            }})
            .catch(error => console.log("error"));
      }

      return (
      <Wrapper>
        <Form onSubmit={handleSubmit} >
          <Title>Welcome</Title>
            <TextInput value={value.username} type="text" handleChange={handleChange('username')} title="Username" />
            <TextInput value={value.password} type="password" handleChange={handleChange('password')} title="Password" />
            <ButtonContainer>
              <SubmitButton type="submit" onClick={() => setPath('signin')}> LOG IN </SubmitButton> 
              <SubmitButton type="submit" onClick={() => setPath('signup')}> SIGN UP </SubmitButton> 
            </ButtonContainer>
        </Form>
      </Wrapper>
      )

}

export default Login;