import React, {useEffect} from 'react'
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import {API_URL} from "../reusables/urls";

import thoughts from '../reducers/thoughts'

const Main = () => {

  const accessToken = useSelector(store => store.user.accessToken);
 
  const dispatch = useDispatch()
  const history = useHistory(); 
  
  useEffect(() => {
      if(!accessToken) {
          history.push('/login')
      }
  }, [accessToken, history]);

  useEffect(() => {
      const options = {
          method: 'GET',
          headers: {
              'Authorization': accessToken
          }
      }
      fetch(API_URL('thoughts', options))
        .then(res => res.json)
        .then(data => {
            if (data.success) {
                batch(() => {
                    dispatch(thoughts.actions.setThoughts(data.thoughts));
                    dispatch(thoughts.actions.setErrors(null));
                });
            } else {
                dispatch(thoughts.actions.setErrors(data));
            }
        })
  }, [accessToken])

    return (
        <div>
            <div>Main</div>
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default Main