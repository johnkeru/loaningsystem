import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import { Tooltip, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import auth from "../../../global/urls/auth";
import { useDispatch } from "react-redux";
import { remove_lender } from "../../../store/reducers/lenders_slice";

import { notifySuccess } from "../../../global/styles/toastify";

export default function LenderDeleteDialog({ token, id, amount, modifyUser }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteLender = () => {
        axios
            .delete(auth.DELETE_LENDER, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { amount },
            })
            .then((res) => {
                notifySuccess(`Your name has been removed successfully.`);
                modifyUser(res.data.user);
            });
        dispatch(remove_lender(id));
        handleClose();
    };

    return (
        <>
            <Tooltip title="delete" placement="left">
                <IconButton
                    onClick={handleClickOpen}
                    sx={{
                        ":hover": {
                            color: "error.main",
                        },
                    }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-description"
                sx={{ width: "500px", m: "auto" }}
            >
                <DialogTitle fontSize="25px" fontWeight={600}>
                    {"Remove your name from the lenders list?"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        By removing your name from the lenders list, borrowers
                        will not be able to request loans from you anymore. Are
                        you sure you want to proceed?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    <Button variant="contained" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteLender}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
