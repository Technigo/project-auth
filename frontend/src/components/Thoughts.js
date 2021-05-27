 
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment'

import { thoughts } from '../reducers/thoughts'
import { THOUGHTS_URL } from '../reusable/Urls';
import {user} from '../reducers/user';

export const Thoughts = () => {
  	const accessToken = useSelector((store) => store.user.accessToken);
	const thoughtsItems = useSelector((store) => store.thoughts.items);

	const dispatch = useDispatch();
	const history = useHistory();

    useEffect(() => {
        if (!accessToken) {
            history.push('/registration');
        }
    }, [accessToken, history]);


	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(THOUGHTS_URL('thoughts'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					batch(() => {
						dispatch(thoughts.actions.setThoughts(data.thoughts));
						dispatch(thoughts.actions.setErrors(null));
					});
				} else {
					dispatch(thoughts.actions.setErrors(data));
				}
			});
	}, [accessToken]);


    const onThoughtSubmit = (event) => {
        event.preventDefault()
    }

    const [thought, setThought] = useState('')
    
    return (
    <Main>  

            <h1 tabIndex='0'>Share your secret secters here!</h1>
          
        <form 
            onSubmit={onThoughtSubmit}
            aria-label='input form for thoughts'>       
            <input 
                type='text'
                value={thought}
                placeholder='Type here'
                onChange={event => setThought(event.target.value)}
            />
            <div>
            <button
                type="submit">
                Share Secret
            </button>
            <Link to='/registration'>
                <button
                    type='button'
                    onClick={()=> dispatch(user.actions.setLogOut())}
                    >Leave the Secret Room                
                </button>
            </Link>
            </div>
        </form>
        
        <h1>Previous Secrets</h1>
        <MessageWrapper>
            {thoughtsItems.map(thought => (
                <div key={thought._id}>
                    <h4 tabIndex='0'>{thought.message}</h4>
                    <p>{moment(thought.createdAt).fromNow()}</p>             
                </div>    
            ))} 
        </MessageWrapper>

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


h1 {
    font-size: 20px;
    color: #626f80;
}

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

input {
    padding: 20px;
    margin: 10px;
    cursor: text;
    width: 300px;
    height: 150px;
}

button{
    padding: 10px 20px 10px 20px;
    margin: 10px;
    border-radius: 7px;
    background-color: #e2e6c5;
    cursor: pointer;
}

` 
const MessageWrapper = styled.div`
    border: 2px solid green;
    background-color: #c5d2e6;
    width: 80%:
    padding: 30px;
    margin: 0 auto;

div{
    padding: 20px;
    margin: 10px;
    width: 300px;
    height: 100px;
    background-color: #fff;
    }

p{
    font-size: 10px;
    }
`