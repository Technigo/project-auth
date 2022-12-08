import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InnerWrapper } from '../assets/GlobalStyles'
import thoughts from 'reducers/thoughts'
import { API_URL } from 'utils/Utils'

export const Dashboard = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
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
    <h2>Dashboard</h2>
    {thoughtsItems.map(item) => {
      return (<p key></p>) // hann inte klart
    }}
  )

  //vårt gamla
    /* return (
        <InnerWrapper>
          <h1>Ready to join your first secret study circle?</h1>
        </InnerWrapper>

    ) */

}

// Daniels Main

