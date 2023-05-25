/* eslint-disable no-underscore-dangle */
import React from 'react';
// import { formatDistance } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
// the ThoughtList-component renders a list of thoughts that are passed in as props.
// The loading state is used to render a loading message while the data is being fetched.
// The onLikesIncrease function is called when the user clicks on the heart button to
// increase the number of hearts for a specific thought.
export const ThoughtList = ({ onLikesIncrease }) => {
  console.log(onLikesIncrease, 'working')
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

  useEffect(() => {
    const options = {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        }
    }
    fetch(API_URL("thoughts"), options)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                dispatch(thoughts.actions.setError(null));
                dispatch(thoughts.actions.setItems(data.response));
            } else {
                dispatch(thoughts.actions.setError(data.response));
                dispatch(thoughts.actions.setItems([]));
            }
        });
}, []);
  
  return (
    <section>
      {thoughtItems.map((list) => (
        
        <div className="Thoughts" key={list._id}>
          <h1>{list.user.username}</h1>
          <p className="thought-text">{list.message}</p>
          

          <div className="likes">
              {/* hand */}
              <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(list._id)}>
                <p className="counter">🤘🏽 x {list.hearts}</p>
            </button>

            {/* hearts */}
            <button
              type="button"
              className={list.hearts === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(list._id)}>            
              <p className="counter">💗 x {list.hearts}</p>
            </button>

            {/* flames */}
            <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(list._id)}>
                <p className="counter">🔥 x {list.hearts}</p>
            </button>

            {/* lemon */}
            <button
              type="button"
              className={list.flames === 0 ? 'like-btn' : 'no-like-btn'}
              onClick={() => onLikesIncrease(list._id)}>              
                <p className="counter">🍋 x {list.hearts}</p>
            </button>

            {/* <p className="date">
              {formatDistance(new Date(list.createdAt), Date.now(), {
                addSuffix: true
              })}
            </p> */}
          </div>
        </div>
      ))}
    </section>
  );
};