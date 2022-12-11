import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "reducers/user";
import { useNavigate } from "react-router-dom";
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Batman } from '../GlobalStyles';
import { Headline, TextInput } from '../GlobalStyles';
// import { movies } from "reducers/movies";
// import { API_URL } from "utils/utils";

export const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    // const movieItems = useSelector((store) => store.movies.items);


        useEffect( () => {
            if (!accessToken) {
                navigate("/login");
            }
        }, []);

        // useEffect(() => {
        //     const options = {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": accessToken
        //         }
        //     }
        //     fetch(API_URL("movies"), options)
        //         .then(res => res.json())
        //         .then(data => {
        //             if(data.success) {
        //                 dispatch(movies.actions.setItems(data.response));
        //                 dispatch(movies.actions.setError(null));
        //             } else {
        //                 dispatch(movies.actions.setItems([]));
        //                 dispatch(movies.actions.setError(data.response));
        //             }
        //         })
        // }, []);
  return (
    <OuterWrapper>
        <InnerWrapper>
            <Batman />
            <Headline><span>Welcome!</span></Headline>
            <h2>Now you are logged in and have access to the mysterious batcave. </h2>
            <Buttons
                type="button"
                onClick={() => {
                dispatch(user.actions.setAccessToken(null));
                navigate("/login");
                }}> 
                Log Out
            </Buttons>
        </InnerWrapper>
    </OuterWrapper>
  );
}

//{movieItems.map((items) => {return <p key={items._id}>{items.Title}</p>})}