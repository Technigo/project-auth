import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Profile from './Profile'

const AuthorizedPage = () => {

  const accessToken = useSelector(store => store.account.accessToken);

  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
        history.push('/');
    }
  }, [accessToken, history]);

  return (
    <>
      <Sidebar />
   
   </>
    

  )
}

export default AuthorizedPage 