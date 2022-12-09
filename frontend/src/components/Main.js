import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import user from '../reducers/user'
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
        dispatch(user.actions.setAccessToken(null));
        navigate('/login');
      };

    return (
        <>
        <Wrapper>
            <FormWrapper>
                {/* <Link to="/login"> GO TO LOGIN</Link> */}
                    <h2>This is some secret thoughts that only authorized users can see.</h2>
                    <ThoughtWrapper>
                    {thoughtItems.map((item) => {
                        return <p key={item._id}>{item.message}</p>
                    })}
                    </ThoughtWrapper>
                    <ButtonWrapper>
                      <Button type="button" onClick={logOut}>Log out</Button>
                    </ButtonWrapper>
            </FormWrapper>
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

const ThoughtWrapper = styled.div`
p {
    /* box-shadow: inset 0 0 10px; */
    padding: 8px;
    background-color: white;
    color: #333;
    border-radius: 15px;
    font-size: 12px;
}
`

const ButtonWrapper = styled.div`
text-align: center;
`

const Button = styled.button`
width: 300px;
border-radius: 15px;
padding: 8px;
margin-top: 30px;
background-color: #e36373;
color: white;
border: 1px solid white;
font-weight: 800;

&:hover {
    background-color: white;
    color: #e36373;
}
`