import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/utils';
import { useNavigate, Link } from 'react-router-dom';
import user from 'reducers/user';
import { Button } from './styled/Buttons.styled';

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const loading = useSelector((store) => store.thoughts.loading);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    dispatch(thoughts.actions.setLoading(true));

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      })
      .finally(() => dispatch(thoughts.actions.setLoading(false)));
  }, []);

  return (
    <>
      <Button>
        <Link to='/' onClick={dispatch(user.actions.setAccessToken(null))}>
          Log out
        </Link>
      </Button>
      <h2>The good old happy thoughts!</h2>
      {loading && <h2>Wait for it... 😅</h2>}
      <ul>
        {thoughtsItems.map((item) => {
          return <li key={item._id}>{item.message}</li>;
        })}
      </ul>
      <a
        href='https://gladatankar.netlify.com'
        target='_blank'
        rel='noreferrer'>
        Remember ?
      </a>
    </>
  );
};

export default Main;
