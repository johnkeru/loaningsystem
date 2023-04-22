import { Grid, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import { HighlightOffOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import RegisterDialog from "./RegisterDialog";

import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/reducers/current_user_slice";
import axios from "axios";

import url from "../../global/urls/auth";

export default function AuthDialog({ setIsAuthClick }) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setIsAuthClick(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsAuthClick(false);
    };

    const handleSubmit = (values, { setErrors }) => {
        axios.post(url.LOGIN, values).then((res) => {
            const data = res.data.data;
            if (!data.success) {
                setErrors({ [data.field]: data.message });
                return;
            }
            dispatch(setLoggedIn());
            handleClose();
        });
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                color="primary"
                sx={{
                    py: 2,
                    px: 15,
                    fontWeight: 700,
                    background: "white",
                    ":hover": {
                        background: "white",
                        color: "green",
                    },
                }}
            >
                Sign In
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
            >
                <IconButton
                    sx={{ position: "absolute", top: 1, right: 1 }}
                    onClick={handleClose}
                >
                    <HighlightOffOutlined />
                </IconButton>

                <Grid sx={{ textAlign: "center", py: 2, px: 5 }}>
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Welcome to Loaning
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        Sign In to continue
                    </Typography>
                </Grid>

                <Grid sx={{ bgcolor: "#e3e3e3" }}>
                    <Grid sx={{ px: 4, py: 3 }}>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <InputField
                                    name={"email"}
                                    placeholder="Email Address"
                                />
                                <InputField
                                    name={"password"}
                                    placeholder="Password"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        py: 2,
                                        fontWeight: 700,
                                        ":hover": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Grid
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    mt={3}
                                >
                                    <Typography
                                        sx={{ fontSize: "13px", mr: 1 }}
                                    >
                                        New to Loaning?{" "}
                                    </Typography>
                                    <RegisterDialog
                                        handleCloseAll={handleClose}
                                    />
                                </Grid>
                            </Form>
                        </Formik>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
