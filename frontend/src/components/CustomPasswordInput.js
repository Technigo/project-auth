import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const CustomPasswordInput = ({ password, onChange }) => {
  const [values, setValues] = useState("")

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div>
    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
    <Input
      id="standard-adornment-password"
      type={values.showPassword ? 'text' : 'password'} //password ** input otherwise text
      //type={{password}.showPassword ? 'text' : 'password'} 
      value={values.password}
      //value={password} // ut
      onChange={(event) => setValues(event.target.value)}
      //onChange={onChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            //onClick={onHandleClickShowPassword} // ut
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
            {/* {{password}.showPassword ? <Visibility /> : <VisibilityOff /> } */}
          </IconButton>
        </InputAdornment>
      }
    />
  </div>
  )
}