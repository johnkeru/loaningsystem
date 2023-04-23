import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Navbar_Breadcrumps from "./Navbar_Breadcrumps";


export default function Navbar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    background: "transparent",
                    color: "#333333",
                    boxShadow: 0,
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "5px solid",
                        borderColor: "primary.main",
                    }}
                >
                    <Grid>
                        <img src="logo.png" width={200} draggable="false" />
                    </Grid>

                    <Navbar_Breadcrumps/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
