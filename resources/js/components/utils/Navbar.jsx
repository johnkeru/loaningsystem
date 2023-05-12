import Grid from "@mui/material/Grid";
import React from "react";
import Navbar_Breadcrumps from "./Navbar_Breadcrumps";

export default function Navbar() {
    return (
        <Grid
            sx={{
                borderBottom: "5px solid",
                borderColor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "72%",
                }}
            >
                <img src="logo.png" width={200} draggable="false" />
                <Navbar_Breadcrumps />
            </Grid>
        </Grid>
    );
}
