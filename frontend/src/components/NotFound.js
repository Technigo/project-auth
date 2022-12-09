import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className='notfound-section'>
      <h2 className='notFoundTitle'>Not Found Page</h2>
			<h3 className='notFoundText'>Sorry, The page you are looking for does not exist!</h3>
      <button className='buttonNotFound' type='button' onClick={() => navigate('/login')}>
        Back
      </button>
    </section>
  )
}

export default NotFound;
