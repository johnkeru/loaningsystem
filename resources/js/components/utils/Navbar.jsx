import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import AuthDialog from "../form/AuthDialog";
import React from "react";
import { Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { setLoggedOut } from "../../store/reducers/current_user_slice";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
    border: "1px solid #e3e3e3",
    flexGrow: 1,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "50ch",
        },
    },
}));

export default function Navbar() {
    const dispatch = useDispatch();

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

                    <Grid
                        sx={{ cursor: "pointer" }}
                        onClick={() => dispatch(setLoggedOut())}
                    >
                        <Typography color="primary.main" fontWeight={700}>
                            keru@gmail.com | logout
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
