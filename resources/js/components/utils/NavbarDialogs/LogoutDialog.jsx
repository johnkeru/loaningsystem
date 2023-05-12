import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import { Link } from "@mui/material";

export default function LogoutDialog({ user, destroy }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        destroy(handleClose);
    };

    return (
        <div>
            <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="text.primary"
                aria-current="page"
                onClick={handleClickOpen}
            >
                {user?.email} | Logout
            </Link>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-description"
                sx={{ width: "500px", m: "auto" }}
            >
                <DialogTitle fontSize="30px">
                    {"Logout from your account?"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        By logging out, you will be signed out of all active
                        sessions on this device.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        color="secondary"
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
