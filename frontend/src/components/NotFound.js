import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Container component="main" maxWidth="xs" sx={{marginTop: 8}}>  
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Sorry nothing here...</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/login">GO TO LOG IN PAGE</Link>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/">GO TO MAIN PAGE</Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFound