import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import React from "react";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrincipalsDialog({ title }) {
    const { token, user, modifyUser } = useAuth();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleBorrow = () => {};

    return (
        <div>
            <Typography
                onClick={handleClickOpen}
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
                {title}
            </Typography>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>Dialog Principals</DialogContent>
            </Dialog>
        </div>
    );
}
