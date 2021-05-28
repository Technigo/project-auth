/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default ({ handleSubmit }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({ email, password });
      }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>
        Login
      </Button>

      <Link to="/signup">No account? Sign Up</Link>
    </form>
  );
};
