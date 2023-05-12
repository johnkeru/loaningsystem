import { Grid, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../utils/InputField";
import { HighlightOffOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

import useAuth from "../../hooks/useAuth";

import url from "../../global/urls/auth";
import axios from "axios";

export default function RegisterDialog({ handleCloseAll }) {
    const { storeData } = useAuth();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseRegisterAndLogin = () => {
        setOpen(false);
        handleCloseAll();
    };

    const handleSubmit = (values, { setErrors }) => {
        axios.post(url.REGISTER, values).then((res) => {
            const data = res.data.data;
            if (!data.success) {
                setErrors({ [data.field]: data.message });
                return;
            }
            storeData({ data });
            handleClose();
        });
    };

    return (
        <div>
            <Typography
                variant="overline"
                color="primary.main"
                sx={{
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: 700,
                }}
                onClick={handleClickOpen}
            >
                Sign Up
            </Typography>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xs"}
            >
                <IconButton
                    sx={{ position: "absolute", top: 1, right: 1 }}
                    onClick={handleCloseRegisterAndLogin}
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
                        Become a member
                    </Typography>
                </Grid>

                <Grid sx={{ bgcolor: "#e3e3e3" }}>
                    <Grid sx={{ px: 4, py: 3 }}>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <InputField
                                    name={"name"}
                                    placeholder="Username"
                                />
                                <InputField
                                    name={"email"}
                                    placeholder="Email Address"
                                    type="email"
                                />
                                <InputField
                                    name={"password"}
                                    placeholder="Password"
                                    type="Password"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    sx={{
                                        py: 2,
                                        fontWeight: 700,
                                        color: "white",
                                        ":hover": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    Sign Up
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
                                        Have an account?{" "}
                                    </Typography>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            textTransform: "capitalize",
                                            cursor: "pointer",
                                            color: "green",
                                            fontWeight: 700,
                                        }}
                                        onClick={handleClose}
                                    >
                                        Sign In
                                    </Typography>
                                </Grid>
                            </Form>
                        </Formik>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
