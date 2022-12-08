import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();

    useEffect( () => {
        if (!accessToken) {
            navigate("/login");
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
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null));
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response));
                }
            })
    }, []);

    const logOut = () => {
        dispatch(thoughts.actions.setAccessToken(null))
        navigate('/login')
      }

    return (
        <>
        <Wrapper>
            <FormWrapper>
                <Link to="/login"> GO TO LOGIN</Link>
                    <h2>This is the main component</h2>
                    {thoughtItems.map((item) => {
                        return <p key={item._id}>{item.message}</p>
                    })}
            </FormWrapper>
            <button type="button" onClick={logOut}>Log out</button>
        </Wrapper>
        </>
    )
}

export default Main;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: #f8f9fd;
color: white;
`

const FormWrapper = styled.div`
width: 40%;
padding: 50px;
background: linear-gradient(#e36373, #e36460);
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border-radius: 15px;
`