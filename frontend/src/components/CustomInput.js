import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'


export const CustomInput = ({ name, onChange, label, minLength, password, onPasswordChange, onHandleClickShowPassword }) => {
  // const [values, setValues] = useState({
  //   password: '',
  //   showPassword: false,
  // })
  const [values, setValues] = useState("")
  
  console.log(values)

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  ////UT!!!!! 



  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

//   const CutstomTextField = styled.TextField`
//   height: 30px;
//   &:WrongLength {
//     background: #474747;
//   }
// `

// const inputP = {minLength: 3}

  return (
      <div>
        <TextField
          required id="standard-required"  //adds *
          //label={"Name"}
          label={label}
          inputProps={minLength}
          value={name}
          onChange={onChange}
          // minLength={2}
          // className= {minLength < 3 ? "WrongLength" : "GoodLength"}
        />
        {/* <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          error id="standard-error"
        /> */}
      </div>
  )
}