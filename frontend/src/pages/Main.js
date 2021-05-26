import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { API_URL } from '../reusable/urls'

const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken)
    const secret = useSelector(store => store.secret.secret)

    useEffect(() => {
      if (!accessToken) {
        history.push('/Login');
      }
    }, [accessToken, history]);

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
            data 
            ? dispatch(secret.actions.setSecret(data)) 
            : dispatch(secret.actions.setErrors(data))
        })
        .catch()
    })

 return <> {secret} </>

}

export default Main;