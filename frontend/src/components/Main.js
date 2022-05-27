import React, { useEffect} from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import thoughts from 'reducers/thoughts'
import user from 'reducers/user'
import { ui } from 'reducers/ui';
import { API_URL } from 'utils/utils'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading';
import giphy from 'assets/giphy.gif'

import { Container, StyledForm, MainData, SubmitButton, Title } from "./Style"

const Main = () => {
    
    const accessToken = useSelector((store) => store.user.accessToken)
    const thoughtItems = useSelector((store) => store.thoughts.items)
    const loading = useSelector((store) => store.ui.loading)

    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    useEffect(()=> {
        if(!accessToken) {
            navigate("/login")
        }
    }, [accessToken])  

    useEffect(() => {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        dispatch(ui.actions.setLoading(true))
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                setTimeout(() => dispatch(ui.actions.setLoading(false)), 1500)
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response))
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setError(data.response))
                    dispatch(thoughts.actions.setItems([]))
                }
            })
        }, [])   




    if(loading){
        return <Loading />
    }

    return (
        <>
        <Container>
            <Header />
            <StyledForm>

                <MainData>
                <Title>This information can be changed without warning, stay tuned 👽 </Title>
                {thoughtItems.map((item)=> {
                return <div key={item._id}>- {item.message}</div>
                })}
                </MainData>

                <img src={giphy} alt="creating-gif" width="375px" />

                <SubmitButton
                type="button" onClick={() => dispatch(user.actions.logOut())}
                >Log out</SubmitButton>
            </StyledForm>
        </Container>
        <Footer/>
        </>
    )
}

export default Main 