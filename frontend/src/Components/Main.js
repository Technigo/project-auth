import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipes from "reducers/recipes";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import user from "reducers/user";

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
            <button
            type="button"
            onClick={() => {
            dispatch(user.actions.setAccessToken(null));
            navigate("/login");
            }}> 
            Log Out
        </button>
            <h2>This is the main component</h2>
            {foodItems.map((singleRecipe) => {
             return (
          <div key={singleRecipe._id}>
                <h3>Kind of Dish: {singleRecipe.KindOfDish}</h3>
                <p>Ingredients: {singleRecipe.Ingredients}</p>
                <p>Name: {singleRecipe.Name}</p>
                <p>Total Time in Minutes: {singleRecipe.TotalTimeMinuits}</p>
                <p>Portions: {singleRecipe.Portions}</p>
          </div>
             )})}   
        </>

    )
}

export default Main;

/* foodItems.map((singleRecipe) => {
    return (
     <div key={singleRecipe._id}>
       <h3>Kind of Dish: {singleRecipe.KindOfDish}</h3>
       <p>Ingredients: {singleRecipe.Ingredients}</p>
       <p>Total Time in Minutes: {singleRecipe.TotalTimeMinuits}</p>
       <p>Portions: {singleRecipe.Portions}</p>
    </div>
    )}) */