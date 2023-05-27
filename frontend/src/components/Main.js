import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user, getUser } from "./reducers/user";
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Loading } from "./Loading";


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
        dispatch(user.actions.setError(null))
    }    

    const theme = createTheme({
      typography: {
        fontFamily: ["'Quicksand', sans-serif"]
      }
    });


     return(
        <>
         {!isLoading ?
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100%'}}>
          <Card sx={{ maxWidth: 800 }}>
            <CardMedia
              sx={{ height: 240,  
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundSize: "cover",
              backgroundPosition: "center"}}
             />
      <CardContent sx={{ backgroundColor:"#f9f9f9"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
           Welcome! <br/> Your email and username have been registered. {username ? (<p>{username}</p>) : null}  {email ? (<p>{email.toUpperCase()}</p>) : null}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{textAlign:"center"}}>
           Ready to learn about animals? This is a fun encyclopedia full of animal facts and games that you are going to love. Lets start learning!
        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor:"#fffff2", display:"flex",justifyContent:" space-around"}}>
        <Button size="small">Share</Button>
        <Button size="small">Start Learning</Button>
        <Button variant="contained" color="primary" onClick={onLogoutButtonClick}>LOGOUT</Button>
      </CardActions>
        </Card>  
      </Container>
    </ThemeProvider>
 : <Loading />}
          </>
          
     )
};

export default Main