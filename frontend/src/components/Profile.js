import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';
import { API_URL } from 'utils/utils';

import thoughts from 'reducers/thoughts';
import user from 'reducers/user';

const Profile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtItems = useSelector((store) => store.thoughts.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    };

    // behöver ändra thoughts sen
    //   fetch(API_URL('thoughts'), options)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success) {
    //         dispatch(thoughts.actions.setItems(data.response));
    //         dispatch(thoughts.actions.setError(null));
    //       } else {
    //         dispatch(thoughts.actions.setError(data.response));
    //         dispatch(thoughts.actions.setItems([]));
    //       }
    //     });
  }, []);

  return (
    <div>
      <h1>Secret page</h1>
      <button onClick={logout}>Log out</button>
      {/* {thoughtItems.map((item) => {
        return <div key={item._id}>{item.message}</div>;
      })} */}
    </div>
  );
};

export default Profile;
