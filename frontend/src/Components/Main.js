import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipes from "reducers/recipes";
import { API_URL } from "utils/utils";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import styled from "styled-components";
import { Button, Headline } from "./GlobalComponents";

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
        <><MainWrapper>
            <Headline>Put together your personal meny here</Headline>
            {foodItems.map((singleRecipe) => {
                return (
                    <><div key={singleRecipe._id}>
                        <Title>Name: {singleRecipe.Name}</Title>
                        <Description>Ingredients: {singleRecipe.Ingredients}</Description>
                        <Description>Kind of Dish: {singleRecipe.KindOfDish}</Description>
                        <Description>Total time in minutes: {singleRecipe.TotalTimeMinuits}</Description>
                        <Description>Portions: {singleRecipe.Portions}</Description>
                    </div>
                    </>
                );
            })}
        </MainWrapper><Button
            type="button"
            onClick={() => {
                dispatch(user.actions.setAccessToken(null));
                navigate("/login");
            } }> LOG OUT
            </Button></>
    )
}

export default Main;

const MainWrapper = styled.div`
  
  margin-top: 10%;
`

const Title = styled.h3`
    font-size: 20px;
`
const Description = styled.p`
    font-size: 16px;
`