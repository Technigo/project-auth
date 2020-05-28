import React from 'react';
import { Link} from 'react-router-dom'

export const LinkSection = ({ title, link, linkTitle }) => (

  <div className="link-section">
    <p> 
      {title}

      <Link to={link}> 
        {linkTitle}
      </Link> 
    </p>
  </div>
)