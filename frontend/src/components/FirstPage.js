import React, { useState } from 'react';
import { Grid, Switch } from '@mui/material';
import styled from '@emotion/styled';
import { Form } from './Form';

const Image = styled('div')`
    background-image: url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ0MzEzMzh8&ixlib=rb-4.0.3&q=85');
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
 `;

export const FirstPage = () => {
    const [checked, setChecked] = useState(false);

    const handleToggle = (event) => {
        setChecked(event.target.checked)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sm={6}>
                <Image />
            </Grid>
            <Grid item xs={10} sm={6}>
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        {!checked ? <Form path="signin" title="Sign in" btnText="Sign in" /> : <Form path="signup" title="Sign up" btnText="Sign up" />}
                    </Grid>
                    <Grid item margin={'0 auto'}>
                        Sign in
                        <Switch checked={checked} onChange={handleToggle} />
                        Sign Up
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};