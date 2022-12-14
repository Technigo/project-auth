import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getThoughts } from 'reducers/thoughts';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';
import { Wrapper } from './styledComponents/Containers';

const Main = () => {
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch]);

  return (
    <Wrapper>
      <h2>This is the main component</h2>
      {thoughtItems.map((item) => {
        return <p key={item._id}>{item.message}</p>;
      })}
      <button
        type="button"
        onClick={() => {
          dispatch(user.actions.setAccessToken(null));
          //   navigate("/login");
        }}
      >
        Log Out
      </button>
    </Wrapper>
  );
};

export default Main;
