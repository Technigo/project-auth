import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/utils';
import { useNavigate, Link } from 'react-router-dom';
import user from 'reducers/user';
import { Button } from './styled/Buttons.styled';

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
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
      });
  }, []);

  return (
    <>
      <Button>
        <Link to='/login' onClick={dispatch(user.actions.setAccessToken(null))}>
          Log Out
        </Link>
      </Button>
      <h2>Random thoughts</h2>
      {thoughtsItems.map((item) => {
        return <p key={item._id}>{item.message}</p>;
      })}
    </>
  );
};

export default Main;
