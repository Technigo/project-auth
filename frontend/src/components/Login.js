import React from "react"
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';


const Login = () => {
    return (
        <>
        <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            // value={username}
            onChange={(e)=>setUsername(e.target.value)}/>

        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            // value={password}
            onChange={(e)=>setPassword(e.target.value)} />

        <Button variant="contained">Submit</Button>

        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Register"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Register" control={<Radio />} label="Register" />
                <FormControlLabel value="Log in" control={<Radio />} label="Log in" />
            </RadioGroup>
        </FormControl>
        </>
    )
    
};

export default Login;