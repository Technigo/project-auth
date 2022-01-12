import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../utils/constants';
// import secrets from '../reducers/secrets';
import user from '../reducers/user';

const Main = () => {
  // const secretsItems = useSelector((store) => store.secrets.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem('user');
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);
  /* 
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    };

    fetch(API_URL('secrets'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(secrets.actions.setItems(data.response));
          dispatch(secrets.actions.setError(null));
        } else {
          dispatch(secrets.actions.setItems([]));
          dispatch(secrets.actions.setError(data.response));
        }
      });
  }, [accessToken]);
 */
  return (
    <div>
      <div>
        <Link to='/login'>To '/login' !</Link>
      </div>
      <h1>It's a secret!</h1>
      {/* {secretsItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))} */}
      <button className='button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Main;
