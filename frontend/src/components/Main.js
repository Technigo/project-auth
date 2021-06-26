import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Header from './Header'

import { API_URL } from '../reusable/urls'
import user from '../reducers/user'

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
}))

const Main = () => {
  const classes = useStyles()
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        'Authorization': accessToken
      }
    }
    fetch(API_URL('secret'), config)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(user.actions.setErrors(null))
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }, [accessToken, dispatch])

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
      </Container>
    </>
  )
}

export default Main