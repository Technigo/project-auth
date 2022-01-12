import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../utils/constant';
import thoughts from '../reducers/thought';

const Main = () => {
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      header: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, [accessToken]);

  return (
    <div>
      <div>
        <Link to="/login">To '/login' !</Link>
      </div>
      <h1>Protected happy thoughts:</h1>
      {thoughtItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
    </div>
  );
};

export default Main;
