import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import space from "images/space.jpg"
import "./Main.css"

import { API_URL } from 'utils/constants';
import secrets from 'reducer/secrets';

import user from '../reducer/user';

export const Main = () => {

const secretsItems = useSelector((store) => store.secrets.items);
const accessToken = useSelector((store) => store.user.accessToken);

const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
  if (!accessToken) {
    navigate('/signin');
  }
}, [accessToken, navigate]);

useEffect(() => {
  
    const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
    },
  };

  fetch(API_URL('secrets'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(secrets.actions.setSecretsItems(data.response));
					dispatch(secrets.actions.setError(null));
				} else {
					dispatch(secrets.actions.setSecretsItems([]));
					dispatch(secrets.actions.setError(data.response));
				}
			});
}, [accessToken]);







const [mode, setMode] = useState('signin')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const onClick = (event) =>{
  event.preventDefault();
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };
  fetch(API_URL(mode), options)
        .then((res) => res.json())
        .then((data) => {
          
     
        batch(() => {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          
        });
    }
  );
  }

















  return (
    <article className='mainContainer'>
      <section className='imgContainer'> 
      <img src={space} alt='background image' />
      </section>
      <section className='mainContent'> 
      <h1>Welcome in to our secret little world!</h1>
      <section className='btnContainerMain'> 
      <button onClick={onClick} type="button"> Log out</button>
      </section>
      </section>
   
    </article>
  );
};

