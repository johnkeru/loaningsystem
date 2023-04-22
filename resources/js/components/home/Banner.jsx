import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthDialog from "../form/AuthDialog";

const Index = () => {
    const [next, setNext] = useState(1);
    const [isAuthClick, setIsAuthClick] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (next === 5) setNext(1);
            else setNext(next + 1);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [next]);

    return (
        <Box position="relative" sx={{ height: "100vh", overflow: "hidden" }}>
            <Box
                position="absolute"
                top={2}
                left={2}
                width={{ xs: "200px", sm: "210px", md: "250px" }}
                height="100px"
                zIndex={2}
            >
                <img
                    src="logo.png"
                    width="100%"
                    height="100%"
                    draggable="false"
                />
            </Box>

            <img
                src={`landing-images/${next}.jpg`}
                alt={`landing-images/${next}.jpg`}
                width="100%"
                height="100%"
            />

            <Grid
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                        "linear-gradient(325deg, rgba(0,0,0,0.38147759103641454) 0%, rgba(0,0,0,0.3310574229691877) 0%, rgba(0,0,0,0.32825630252100846) 76%, rgba(6,95,65,1) 76%, rgba(6,95,65,1) 77%, rgba(255,255,255,1) 77%)",
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
                    color: "white",
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    {!isAuthClick && (
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3rem",
                                    sm: "4rem",
                                    md: "5rem",
                                },
                            }}
                        >
                            Start your first loan!
                        </Typography>
                    )}

                    <AuthDialog setIsAuthClick={setIsAuthClick} />
                </Box>
            </Grid>
        </Box>
    );
};

export default Index;
