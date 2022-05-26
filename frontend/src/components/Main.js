import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';



const Main = () => {

  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!accessToken) {
      navigate('/signin');
  
    }
  }, [accessToken]);

  useEffect(() => {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
    }

    fetch(API_URL('thoughts'), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(thoughts.actions.setItems(data.response))
          dispatch(thoughts.actions.setError(null))
        } else {
          dispatch(thoughts.actions.setItems([]))
          dispatch(thoughts.actions.setError(data.response))
        }
      })
  }, []);

  return (
    <>
      <Link to='/signin'>LINK TO /signin</Link>
      <h1>Hello member</h1>
      {thoughtItems.map((item) => {
        return <div key={item._id}>{item.message}</div>
      })}
    </>
  )
};

export default Main;
