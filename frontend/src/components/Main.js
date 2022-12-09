import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movies } from "reducers/movies";
import { user } from "reducers/user";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";

export const Main = () => {
    //const userId = useSelector((store) => store.user.userId)
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    const movieItems = useSelector((store) => store.movies.items);

    // useEffect(()=>{
        
    //     const dispatch = useDispatch();
    //     const accessToken = useSelector((store) => store.user.accessToken);
    //     const navigate = useNavigate();
    
        useEffect( () => {
            if (!accessToken) {
                navigate("/login");
            }
        }, []);

        useEffect(() => {
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                }
            }
            fetch(API_URL("movies"), options)
                .then(res => res.json())
                .then(data => {
                    if(data.success) {
                        dispatch(movies.actions.setItems(data.response));
                        dispatch(movies.actions.setError(null));
                    } else {
                        dispatch(movies.actions.setItems([]));
                        dispatch(movies.actions.setError(data.response));
                    }
                })
        }, []);
  return (
    <>
      <Link to="/login"> GO TO LOGIN</Link>
      <h2>This is the main component</h2>
      {movieItems.map((items) => {return <p key={items._id}>{items.Title}</p>})}
    </>
  );
}

//