import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipes from "reducers/recipes";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";

const Main = () => {
    const foodItems = useSelector((store) => store.recipes.items);
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
(console.log (foodItems))

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
    
        fetch(API_URL("recipes"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(recipes.actions.setItems(data.response));
                    dispatch(recipes.actions.setError(null));
                } else {
                    dispatch(recipes.actions.setItems([]));
                    dispatch(recipes.actions.setError(data.response));
                }
            })
    }, []);

    return (
        <>
            <Link to="/login"> logga ut knapp</Link>
            <h2>This is the main component</h2>
            {foodItems.map((singleRecipe) => {
             return (
             <p key={singleRecipe._id}>{singleRecipe.recipe}</p> 
             )})}  
        </> 
    )
}

export default Main;