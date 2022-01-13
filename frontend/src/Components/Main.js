import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from 'utils/url';
import thoughts from '../reducers/thoughts';

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  // very nice redirection!
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    };

    // what is this egentligen?
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
        <Link className='Link' to='/login'>
          to '/login' !
        </Link>
      </div>
      <h1>protected Happy thoughts: </h1>
      {thoughtsItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
    </div>
  );
};

export default Main;
