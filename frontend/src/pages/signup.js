/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import toast from 'react-hot-toast';

import Header from '../components/Header';
import Signup from '../components/Signup';
import { registerUser, sessionSelector, clearRequests } from '../store/session';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { reqSuccess, reqError, errorMessage } = useSelector(sessionSelector);

  const onSignup = (data) => {
    dispatch(registerUser({ ...data }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearRequests());
    };
  }, []);

  useEffect(() => {
    if (reqError) {
      if (typeof errorMessage === 'object') {
        errorMessage.forEach((message) => toast.error(message));
      } else {
        toast.error(errorMessage)
      }
      dispatch(clearRequests());
    }

    if (reqSuccess) {
      dispatch(clearRequests());
      history.push('/');
    }
  }, [reqError, reqSuccess]);

  return (
    <div className={classes.paper}>
      <Header title="Sign up" />
      <Signup handleSubmit={onSignup} />
    </div>
  );
};
