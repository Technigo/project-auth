import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user, getUser } from "./reducers/user";
import { Loading } from "./Loading"; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const email = useSelector(store => store.user.email);
    const username = useSelector(store => store.user.username);
    const isLoading = useSelector((store) => store.loading.isLoading)
    const navigate = useNavigate();
    useEffect(() => {
        if(!accessToken){
            navigate("/login")
        }else{
            dispatch(getUser())
        }
    },[accessToken]);
    
    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setEmail(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setBadges(null));
        dispatch(user.actions.setHistory(null));
        dispatch(user.actions.setAvatar(null));
        dispatch(user.actions.setTotalScore(null));
        dispatch(user.actions.setCreatedAt(null));
        // dispatch(user.actions.setPassword(null));
        dispatch(user.actions.setError(null))
    }    
     return(
        <> {!isLoading ? (
            <>
            <Card sx={{ maxWidth: 800 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Welcome! Your email {email ? (<p>{email.toUpperCase()}</p>) : null} and username {username ? (<p>{username}</p>) : null} have been registered. 
        </Typography>
        <Typography variant="body2" color="text.secondary">
           Ready to learn about animals? This is a fun encyclopedia full of animal facts and games that you are going to love. Lets start learning!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
              <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
              
            </>
          ) : <Loading />}
          </>
          
     )
};

export default Main