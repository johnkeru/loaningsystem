import Navbar from "../utils/Navbar";
import { Grid } from "@mui/material";
import Card from "./home-utils/Card";
import SideProfile from "./home-utils/SideProfile";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../global/styles/toastify.css";

const Category = ({ user, token, modifyUser }) => {
    return (
        <div>
            <ToastContainer />

            <Navbar />

            <Grid display="flex" m="20px auto" width="70%">
                <SideProfile
                    user={user}
                    token={token}
                    modifyUser={modifyUser}
                />

                <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    flexWrap="wrap"
                >
                    <Card src="landing-images/1.jpg" title="Be a borrower" />
                    {Boolean(user.is_lended) ? (
                        <Card
                            src="landing-images/6.jpg"
                            title="Additional Lend"
                        />
                    ) : (
                        <Card src="landing-images/2.jpg" title="Be a lender" />
                    )}
                    <Card src="landing-images/3.jpg" title="History" />
                    <Card src="landing-images/4.jpg" title="Repayment" />
                </Grid>
            </Grid>
        </div>
    );
};

export default Category;
