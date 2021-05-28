import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from './Header';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Main = () => {
    const classes = useStyles();

    const accessToken = useSelector(store => store.user.accessToken);

    const history = useHistory();

    useEffect(() => {
        if (!accessToken) {
            history.push('/login');
        }
    }, [accessToken, history]);

    return (

    <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
           Welcome to the Secret Page!
        </Typography>
        </div>
        <Header />

        <Box mt={8}>
        </Box>
        </Container>
    </>
    );
};

export default Main;