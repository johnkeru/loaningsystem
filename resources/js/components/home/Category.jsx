import React from "react";
import Navbar from "../utils/Navbar";
import { Grid, Typography } from "@mui/material";

const Category = () => {
    return (
        <div>
            <Navbar />

            <Grid
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                m="20px auto"
                width="60%"
                flexWrap="wrap"
            >
                <Grid
                    width={400}
                    height={300}
                    mb="30px"
                    position="relative"
                    boxShadow={3}
                    sx={{
                        ":hover": {
                            boxShadow: 10,
                        },
                    }}
                >
                    <img
                        src="landing-images/1.jpg"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ blur }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0, .3)",
                            ":hover": {
                                background: "rgba(0,0,0,.1)",
                            },
                        }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                                border: "3px solid",
                                bgcolor: "rgba(0,0,0,.5)",
                                borderColor: "#fff",
                                color: "#fff",
                                textAlign: "center",
                                px: 5,
                                py: 2,
                            }}
                        >
                            Be a borrower
                        </Typography>
                    </Grid>

                    <Grid />
                </Grid>
                <Grid
                    width={400}
                    height={300}
                    mb="30px"
                    position="relative"
                    boxShadow={3}
                    sx={{
                        ":hover": {
                            boxShadow: 10,
                        },
                    }}
                >
                    <img
                        src="landing-images/2.jpg"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ blur }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0, .3)",
                            ":hover": {
                                background: "rgba(0,0,0,.1)",
                            },
                        }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                                border: "3px solid",
                                bgcolor: "rgba(0,0,0,.5)",
                                borderColor: "#fff",
                                color: "#fff",
                                textAlign: "center",
                                px: 5,
                                py: 2,
                            }}
                        >
                            Be a lender
                        </Typography>
                    </Grid>

                    <Grid />
                </Grid>
                <Grid
                    width={400}
                    height={300}
                    mb="30px"
                    position="relative"
                    boxShadow={3}
                    sx={{
                        ":hover": {
                            boxShadow: 10,
                        },
                    }}
                >
                    <img
                        src="landing-images/3.jpg"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ blur }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0, .3)",
                            ":hover": {
                                background: "rgba(0,0,0,.1)",
                            },
                        }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                                border: "3px solid",
                                bgcolor: "rgba(0,0,0,.5)",
                                borderColor: "#fff",
                                color: "#fff",
                                textAlign: "center",
                                px: 5,
                                py: 2,
                            }}
                        >
                            Principal
                        </Typography>
                    </Grid>

                    <Grid />
                </Grid>
                <Grid
                    width={400}
                    height={300}
                    mb="30px"
                    position="relative"
                    boxShadow={3}
                    sx={{
                        ":hover": {
                            boxShadow: 10,
                        },
                    }}
                >
                    <img
                        src="landing-images/4.jpg"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ blur }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0, .3)",
                            ":hover": {
                                background: "rgba(0,0,0,.1)",
                            },
                        }}
                    />

                    <Grid
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                cursor: "pointer",
                                fontWeight: 600,
                                border: "3px solid",
                                bgcolor: "rgba(0,0,0,.5)",
                                borderColor: "#fff",
                                color: "#fff",
                                textAlign: "center",
                                px: 5,
                                py: 2,
                            }}
                        >
                            Repayment
                        </Typography>
                    </Grid>

                    <Grid />
                </Grid>
            </Grid>
        </div>
    );
};

export default Category;
