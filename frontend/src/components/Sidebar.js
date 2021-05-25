import React from 'react'

const Sidebar = () => {
  console.log('mounted')
  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-list">
          <li>Profile</li>
          <li>Feed</li>
          <li>Log out</li>
        </ul>
      </nav>

    </aside> 

  )
}

export default Sidebar 