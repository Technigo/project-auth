import React, { useEffect } from 'react'
import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <>
          <Link to="/login">Go to login</Link>
           <h1>Not found...</h1>
        </>
    )
}

export default NotFound