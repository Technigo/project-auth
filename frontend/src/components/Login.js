import React, { useState, useEffect } from "react"
import { useDispatch, useSelector, batch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import styled from "styled-components/macro"

import { API_URL } from "utils/utils"
import user from "reducers/user"


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const Login = () => {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")

    const [mode, setMode] = useState("login")
    console.log(mode)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken)

    console.log("accessToken", accessToken)


    const handleLoginSuccess = (data) => {
        batch(() => {
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setUserName(data.username))
            dispatch(user.actions.setError(null))
        })
    }
    const handleLoginFailure = (data) => {
        batch(() => {
            dispatch(user.actions.setError(data.response))
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setUserName(null))
        })
    }    

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])
   
    return (
        <>
            <StyledLoginSection>
                <StyledLoginWrapper>
                    {/* <StyledMode>
                        <label htmlFor="register">Register</label>
                            <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")} />
                        <label htmlFor="login">Login</label>
                            <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")} />
                    </StyledMode> */}

                    {mode === 'login' ? <h1>Login here</h1> : <h1>Register here</h1>}
                    
                    <Formik
                        initialValues={{ username: "", password: "", email: "" }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .required("Required"),
                            password: Yup.string()
                                .required("Required")
                                .min(8, "The password must contain at least 8 characters"),
                                // email: Yup.string()
                                //     .required("Required")
                            //     .email("Invalid email address")
                        })}

                        onSubmit={(values, { setSubmitting }) => {
                            fetch(API_URL(mode), {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({username: values.username, password: values.password})
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                handleLoginSuccess(data)
                                setMode('login')
                            })
                            .catch((err) => {
                                handleLoginFailure(err);
                            })
                            .finally(() => setSubmitting(false))
                        }}
                        
                        >
                    {({ isSubmitting }) => (
                        <StyledForm>
                                {isSubmitting && <div>Loading...</div>}
                                <StyledInput
                                    label="Username"
                                    name="username"
                                    type="text" 
                                    />

                                <StyledInput
                                    label="Password"
                                    name="password"
                                    type="password" 
                                />

                                {/* <MyTextInput
                                    label="Email address"
                                    name="email"
                                    type="email" 
                                /> */}
                                {mode === 'login' ? <StyledButton type="submit" background="#EBD0D0" boxShadow="2px 3px" width="100px">Login</StyledButton> : <StyledButton type="submit" background="#EBD0D0">Register</StyledButton>}
                                
                                {mode === 'login' ? 
                                <StyledButton type="button" onClick={()=> setMode("register")} background="transparent" width="100%" textDecoration="underline">Not a member yet? Register here</StyledButton> :
                                <StyledButton type="button" onClick={()=> setMode("login")} background="transparent" width="100%" textDecoration="underline">Already a member? Login here</StyledButton>
                            }
                            </StyledForm>
                    )}
                    
                    </Formik>
                </StyledLoginWrapper>
            </StyledLoginSection>
        </>  
    )
}

export default Login


const StyledLoginSection = styled.section`
    display: flex;
    flex-direction: column;   
    align-items: center; 
    justify-content: center;
    height: 100vh;
    background: #E7CFD7;
`

const StyledLoginWrapper = styled.section`
    display: flex;
    flex-direction: column;   
    align-items: center; 
    justify-content: center;
    width: 300px;
    height: 80vh;
    background: #959595;
    border: 10px solid black;

`
    
const StyledMode = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
`

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    label {
        margin-bottom: 0.5rem;
    }
`

const StyledInput = styled(MyTextInput)`
    width: 150px;
    height: 20px;
    margin-bottom: 1rem;
    border: none;
    box-shadow: 2px 3px;
`

const StyledButton = styled.button`
    margin-top: 1rem;
    height: 25px;
    width: ${props => props.width};
    font-family: inherit;
    background: ${props => props.background};
    border: none;
    box-shadow: ${props => props.boxShadow};
    
    &:hover {
        text-decoration: ${props => props.textDecoration};
    }
`
