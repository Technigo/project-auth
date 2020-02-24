import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../reducers/auth"
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components/macro'
import moment from 'moment'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background: #fff;
`

const Loading = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const SecretForm = styled.form`
    display: flex;
    justify-content: flex-start;
    width: 50vw;
`

const SecretText = styled.input`
    border-style: hidden;
    border-radius: 5px;
    border-bottom: 2px solid black;
    background-color: #eee;
    width: 80%;
    height: 30px;
    font-size: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 10px;
    @media (min-width: 768px) {
        width: 40vw;
    }
`

const AddSecret = styled.input`
    border: none;
    font-size: 20px;
    line-height: 20px;
    margin: 0px 10px;
    padding: 0px;
    text-align: center;
    opacity: ${props => (props.active ? "1" : "0.6")};
`

const SecretList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
`

const StyledSecret = styled.li`
    background: #fff;
`

const SecretDate = styled.p`
    font-size: 12px;
`

export const Secret = (props) => {
    const [secrets, setSecrets] = useState([])
    const [sentMessage, setSentMessage] = useState(false)
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const token = useSelector(store => store.auth.accessToken)
    const userId = useSelector(store => store.auth.userId)
    const name = useSelector(store => store.auth.name)

    const logout = () => {
        dispatch(auth.actions.logout())
    }

    const sendSecret = (event) => {
        event.preventDefault()
        props.onFormSubmit(message)
        if (message !== "") {
            fetch(`https://authentication-tiago-ivett.herokuapp.com/secret/${userId}`, {
                method: "POST",
                body: JSON.stringify({ message }),
                headers: { "Content-Type": "application/json", "Authorization": token }
            }).catch(err => console.log("error:", err))
        }
        setMessage("")
        // setSentMessage(!sentMessage)
    }

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8080/secrets/${userId}`, {
                headers: {
                    "Authorization": token
                }
            })
                .then(res => {
                    setStatus(res.status)
                    return res.json()
                })
                .then(json => {
                    setSecrets(json)
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    setStatus(404)
                })
        } else {
            setLoading(false)
            setStatus(404)
        }
    }, [userId, token, sentMessage])

    if (loading) {
        return <Loading><BeatLoader color='#000' /></Loading>
    }


    return (
        <Main>
            <h1>Welcome {name}! Here are your secrets.</h1>
            <SecretForm onSubmit={sendSecret}>
                <SecretText type="text" value={message} onChange={event => setMessage(event.target.value)} placeholder="Share a secret..."></SecretText>
                <AddSecret type="submit" value="+" active={message.length > 0} disabled={message.length === 0} />
            </SecretForm>
            <SecretList>
                {secrets.map(secret => (
                    <StyledSecret key={secret._id}>
                        <h3>{secret.message}</h3>
                        <SecretDate>We've been keeping this secret since {moment(secret.createdAt).fromNow()}</SecretDate>
                    </StyledSecret>
                ))}
            </SecretList>
            <button type='button' onClick={logout}>Logout</button>
        </Main>
    )
}
