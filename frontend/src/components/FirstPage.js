import React from 'react';
import { SignIn } from './SignIn';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const Image = styled('div')`
    background-image: url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ0MzEzMzh8&ixlib=rb-4.0.3&q=85');
    min-height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
 `;

export const FirstPage = () => {
    return (
     <Grid container spacing={2}>
        <Grid item xs={6}>
            <Image />
        </Grid>
        <Grid item xs={6}>
            <SignIn />
        </Grid>
    </Grid>
    )
};