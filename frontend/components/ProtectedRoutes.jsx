import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// ProtectedRoute component handles the verification of the token for all protected routes
export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('https://project-auth-pqxu.onrender.com/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        setIsLoading(false);
      } catch (error) {
        sessionStorage.removeItem('token');
        navigate('/home');
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate('/home');
    }
  }, [navigate, token]);

  if (isLoading || !token) {
    return null;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};