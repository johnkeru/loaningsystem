import PeopleIcon from "@mui/icons-material/People";
import { Paid } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import auth from "../../../global/urls/auth";
import SideProfileBorrowedFrom from "./SideProfileBorrowedFrom";
import { useDispatch, useSelector } from "react-redux";
import { init } from "../../../store/reducers/borrowers_slice";
import SideProfileBorrowers from "./SideProfileBorrower";
import AddMoneyDialog from "../../utils/NavbarDialogs/AddMoneyDialog";
import SideProfileImageUploadDialog from "./SideProfileImageUploadDialog";

const SideProfile = ({ user, token, modifyUser }) => {
    const borrowers = useSelector((root) => root.borrowersSlice);

    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(auth.COUNT_BORROWERS_AND_LENDED, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                dispatch(init(res.data));
            });
    }, []);

    return (
        <Grid width="40%">
            <Box
                sx={{
                    p: 2,
                }}
            >
                <Grid display="flex" alignItems="center">
                    <SideProfileImageUploadDialog
                        user={user}
                        modifyUser={modifyUser}
                        token={token}
                    />
                    <Typography variant="h5">{user?.name}</Typography>
                </Grid>
                <Box display="flex" alignItems="center" my={1}>
                    <Typography sx={{ fontSize: "17px" }}>Balance: </Typography>
                    <Box display="flex" alignItems="center" color="green">
                        <Paid sx={{ mx: 1 }} />
                        <Typography sx={{ fontSize: "17px" }}>
                            {user.money}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" my={1}>
                    <Typography sx={{ fontSize: "17px" }}>
                        Borrowed:{" "}
                    </Typography>
                    <Box display="flex" alignItems="center" color="red">
                        <Paid sx={{ mx: 1 }} />
                        <Typography sx={{ fontSize: "17px" }}>
                            {user.borrowed}
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" my={1}>
                    <Typography sx={{ fontSize: "17px" }}>Lended: </Typography>
                    <Box display="flex" alignItems="center" color="blue">
                        <Paid sx={{ mx: 1 }} />
                        <Typography sx={{ fontSize: "17px" }}>
                            {user.lended}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <AddMoneyDialog inProfile />

            <Grid px={1}>
                {borrowers.borrowers_list.length !== 0 ? (
                    <SideProfileBorrowers
                        borrowers_count={borrowers.borrowers_count}
                        borrowers_list={borrowers.borrowers_list}
                    />
                ) : (
                    <Grid display="flex" mt={3}>
                        <PeopleIcon />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                ml: 2,
                                cursor: "pointer",
                                ":hover": { textDecoration: "underline" },
                            }}
                        >
                            0 borrowers
                        </Typography>
                    </Grid>
                )}

                {borrowers.borrowed_from_list.length !== 0 ? (
                    <SideProfileBorrowedFrom
                        inProfile
                        borrowed_from_count={borrowers.borrowed_from_count}
                        borrowed_from_list={borrowers.borrowed_from_list}
                    />
                ) : (
                    <Grid display="flex" mt={3}>
                        <PeopleIcon />
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                ml: 2,
                                cursor: "pointer",
                                ":hover": { textDecoration: "underline" },
                            }}
                        >
                            0 Lent
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default SideProfile;
