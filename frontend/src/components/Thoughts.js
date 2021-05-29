import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import {user} from '../reducers/user';

export const Thoughts = () => {
const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const history = useHistory();

    useEffect(() => {
        if (!accessToken) {
            history.push('/registration');
        }
    }, [accessToken, history]);


    const onThoughtSubmit = (event) => {
        event.preventDefault()
    }
    
    return (
    <Main>    
        <form 
            onSubmit={onThoughtSubmit}
            aria-label='input form for thoughts'>       
            
            <img alt='Bee' src='https://images.unsplash.com/photo-1584712200560-f68e5cb7c7d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2793&q=80' />

            <div>
                <Link to='/registration'>
                    <button
                        type='button'
                        onClick={()=> dispatch(user.actions.setLogOut())}
                        >Let the Bee be                
                    </button>
                </Link>
            </div>
        </form>
    </Main>  
    )
}

const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
background-image: linear-gradient(#c5e6de, #fff);
height: 100vh;
align-items: center;

form {
    displa: flex;
    flex-direction: column;
    border: 2px solid green;
    background-color: #c5d2e6;
    heights: 200px:
    width: 80%:
    padding: 30px;
    margin: 0 auto;
}

img{
    width: 350px;
}

button{
    padding: 10px 20px 10px 20px;
    margin: 10px;
    border-radius: 7px;
    background-color: #e2e6c5;
    cursor: pointer;
}
` 
