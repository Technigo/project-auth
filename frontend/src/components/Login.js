import React, { useState, useEffect } from "react"
import { useDispatch, useSelector, batch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
// import { useFormik } from "formik"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"
import axios from "axios"
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

    const [mode, setMode] = useState("register")
    console.log(mode)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken)

    console.log("accessToken", accessToken)

    ////////////////
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
    ////////////////
    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])


    // const onFormSubmit = (event) => {
    //     event.preventDefault()
        
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({username: username, password: password})
    //     }

    //     fetch(API_URL(mode), options)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.success) {
    //                 batch(() => {
    //                     dispatch(user.actions.setUserId(data.userId))
    //                     dispatch(user.actions.setAccessToken(data.accessToken))
    //                     dispatch(user.actions.setUserName(data.username))
    //                     dispatch(user.actions.setError(null))
    //                 })
    //             } else {
    //                 batch(() => {
    //                     dispatch(user.actions.setError(data.response))
    //                     dispatch(user.actions.setUserId(null))
    //                     dispatch(user.actions.setAccessToken(null))
    //                     dispatch(user.actions.setUserName(null))
    //                 })
    //             }
    //         })
    // }

    
    return (
        <>
            <StyledMode>
                <label htmlFor="register">Register</label>
                    <input type="radio" id="register" checked={mode === "register"} onChange={() => setMode("register")} />
                <label htmlFor="login">Login</label>
                    <input type="radio" id="login" checked={mode === "login"} onChange={() => setMode("login")} />
            </StyledMode>
            
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

                onSubmit={(values) => {
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
                    })
                    .catch((err) => {
                        handleLoginFailure(err);
                    })
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

                        <StyledButton type="submit">Submit</StyledButton>
                    </StyledForm>
               )}
            </Formik>
        </>  
    )
}

export default Login

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
    width: 50%;
    border-radius: 20px;
    margin-bottom: 1rem;
`

const StyledButton = styled.button`
    margin-top: 1rem;
    border-radius: 20px;
`
