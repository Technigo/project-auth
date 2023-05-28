import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';
import { API_URL } from 'utils/urls';

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  console.log(thoughtsItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': accessToken
      }
    };
    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setErrors(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setErrors(data.response));
        }
      });
  }, []);

  const handleLogout = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(thoughts.actions.setItems([]));
  };
  return (
    <section className="main-section">
      <button className="logout-button" type="button" onClick={handleLogout}>
        Logout
      </button>
      <p classname="display-username">
        Logged in as: {username && username.toUpperCase()}
      </p>
      <h1>The thoughts</h1>
      {console.log(thoughtsItems)}
      {thoughtsItems.map((item) => {
        return (
          <div key={item._id} className="item">
            <p>{item.message}</p>
            <p>{item.username}</p>
          </div>
        );
      })}
    </section>
  );
};
export default Main;
