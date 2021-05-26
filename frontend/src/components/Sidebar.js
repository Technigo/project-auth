import React, { useDebugValue } from 'react'

import { dispatch, useDispatch } from 'react-redux'

import { account } from '../reducers/account'

import { Link } from 'react-router-dom'

const Sidebar = () => {

  const dispatch = useDispatch()
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <Link to="/authorized/profile"><li>Profile</li></Link>
          <Link to="/authorized/feed"><li>Feed</li></Link>
          <li onClick={() => dispatch(account.actions.logOut())}>Log out</li>
        </ul>
      </nav>

    </aside> 

  )
}

export default Sidebar 