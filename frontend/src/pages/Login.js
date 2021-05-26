import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'
import TextInput from '../components/TextInput'
import { API_URL } from '../reusable/urls'


const Form = styled.form`
display: flex;
flex-direction: column;`

const Title = styled.h1``

const SubmitButton = styled.button``

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
        <Form onSubmit={handleSubmit} >
          <Title></Title>
            <TextInput value={value.username} type="text" handleChange={handleChange('username')} title="Username" />
            <TextInput value={value.password} type="password" handleChange={handleChange('password')} title="Password" />
              <SubmitButton type="submit" onClick={() => setPath('signin')}> LOG IN </SubmitButton> 
              <SubmitButton type="submit" onClick={() => setPath('signup')}> SIGN UP </SubmitButton> 
        </Form>
      )

}

export default Login;