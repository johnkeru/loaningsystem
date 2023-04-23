import React from "react";
import Navbar from "../utils/Navbar";
import { Grid, Typography } from "@mui/material";
import Card from "./home-utils/Card";

const Category = ({user}) => {
    return (
        <div>
            <Navbar />

            <Grid 
                display='flex'
                m="20px auto"
                width="70%"
            >
                <Grid width='40%'>
                    
                    <Typography variant='h5'>User: {user?.name}</Typography>
                    <Typography variant='h6'>Money: {user?.money}</Typography>
                    <Typography variant='h6'>Borrowed: 0</Typography>
                    <Typography variant='h6'>Lended: 0</Typography>
                </Grid>

                <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    flexWrap="wrap"
                >
                    <Card src="landing-images/1.jpg" title="Be a borrower"/>
                    <Card src="landing-images/2.jpg" title="Be a lender"/>
                    <Card src="landing-images/3.jpg" title="Principals"/>
                    <Card src="landing-images/4.jpg" title="Repayment"/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Category;
