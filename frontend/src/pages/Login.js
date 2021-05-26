import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import user from '../reducers/user'
import TextInput from '../components/TextInput'
import { API_URL } from '../reusable/urls'

const Login = () => {
    const history = useHistory;
    const accessToken = useSelector(store => store.user.accessToken)

    useEffect(() => {
        if (!accessToken) {
          history.push('/');
        }
      }, [accessToken, history]);

      useEffect(() => {
          const option = {
              method: 'GET',
              headers: {
                Authorization: accessToken
              }  
          }

          fetch(API_URL('signin'), option)
          .then((res) => res.json)

      })

}

export default Login;