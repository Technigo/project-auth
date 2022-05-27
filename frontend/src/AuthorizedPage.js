import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from 'components/Sidebar'
import Profile from 'components/Profile'

const AuthorizedPage = () => {

  const accessToken = useSelector(store => store.account.accessToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
        navigate.push('/');
    }
  }, [accessToken, history]);

  return (
    <Sidebar />
  )
}

export default AuthorizedPage 