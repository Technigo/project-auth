import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import secret from '../reducers/secret'
import { API_URL } from '../reusable/urls'

const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken)
    const secrets = useSelector(store => store.secret.message)

    useEffect(() => {
      if (!accessToken) {
        history.push('/Login');
      }
    }, [accessToken, history]);

    console.log(accessToken)
    useEffect(() => {
        const option = {
            method: 'GET',
            headers: {
              Authorization: accessToken
            }  
        }
        fetch(API_URL('secret'), option)
        .then((res) => res.json())
        .then(data => {
            data.success 
            ? dispatch(secret.actions.setSecret(data)) 
            : dispatch(secret.actions.setErrors(data))
        })
        .catch()
    })
    // ,[accessToken])

 return <div> {secrets} </div>

}

export default Main;