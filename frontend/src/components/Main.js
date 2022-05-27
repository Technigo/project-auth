import React, { useEffect} from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import thoughts from 'reducers/thoughts'

import { API_URL } from 'utils/utils'
import Header from './Header'
import Footer from './Footer'

import { Container, StyledForm, MainData, SubmitButton } from "./Style"

const Main = () => {
    
    const accessToken = useSelector((store) => store.user.accessToken)
    const thoughtItems = useSelector((store) => store.thoughts.items)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const logout = () => {
    //     batch(()=> {
    //         dispatch(user.actions.setUserName(null))
    //         dispatch(user.actions.setAccessToken(null))
    //     })
    // }
    
    useEffect(()=> {
        if(!accessToken) {
            navigate("/login")
        }
    }, [accessToken, navigate])

    useEffect(() => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }

        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response))
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setError(data.response))
                    dispatch(thoughts.actions.setItems([]))
                }
            })
        }, [accessToken, dispatch])

    const handleRestart = () => {
        dispatch(user.actions.restart())
    }

    return (
        <>
        <Container>
            <Header />
            <StyledForm>
                <MainData>This is Main.</MainData>

                {thoughtItems.map((item)=> {
                return <div key={item._id}>{item.message}</div>
                })}

                <SubmitButton
                // onSubmit={logout}
                // onClick={() => {dispatch(user.actions.setAccessToken(null))}}
                onClick={handleRestart}
                >Log out</SubmitButton>
            </StyledForm>
        </Container>
        <Footer/>
        </>
    )
}

export default Main 