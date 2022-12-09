import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InnerWrapper } from '../assets/GlobalStyles'
import thoughts from 'reducers/thoughts'
import { API_URL } from 'utils/Utils'

export const Dashboard = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    if(!accessToken) {
      navigate("/login")
    }
  }, [accessToken])

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    }
    fetch(API_URL("thoughts"), options)
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        dispatch(thoughts.actions.setItems(data.response));
        dispatch(thoughts.actions.setError(null));
      } else {
        dispatch(thoughts.actions.setItems([]));
        dispatch(thoughts.actions.setError(data.response));
      }
    })
  }, []);

  return (
    <>
    <Link to="/login"></Link>
    <h2>Dashboard</h2>
    {thoughtsItems.map(item) => {
      return (<p key={item._id}>{item.message}</p>) // hann inte klart
    }}
    </>
  )

  //vårt gamla
    /* return (
        <InnerWrapper>
          <h1>Ready to join your first secret study circle?</h1>
        </InnerWrapper>

    ) */

}

// Daniels Main

