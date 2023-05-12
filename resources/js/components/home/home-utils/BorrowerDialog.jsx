import { IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React from "react";
import BorrowerTable from "./BorrowerTable";
import { HighlightOffOutlined } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BorrowerDialog({ title }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                maxWidth="xl"
            >
                <IconButton
                    sx={{ position: "absolute", top: 1, right: 1 }}
                    onClick={handleClose}
                >
                    <HighlightOffOutlined />
                </IconButton>
                <DialogTitle>
                    Please select the item you would like to borrow.
                </DialogTitle>
                <DialogContent>
                    <BorrowerTable />
                </DialogContent>
            </Dialog>
        </div>
    );
}
