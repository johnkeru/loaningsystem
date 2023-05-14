import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import React, { useEffect, useState } from "react";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function HistoryDialog() {
    const { token } = useAuth();
    const [histories, setHistories] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (token) {
            axios
                .get(auth.HISTORIES, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setHistories(res.data.histories);
                });
        }
    }, [token]);

    const dateFormatter = (str) => {
        const dateObj = new Date(str);
        const options = {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return dateObj.toLocaleDateString("en-US", options);
    };

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
                {histories.length > 1 ? "Histories" : "History"}
            </Typography>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {histories.length > 1 ? "Histories" : "History"}
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12} md={6}>
                        <Demo>
                            <List>
                                {histories.length !== 0 ? (
                                    histories.map((history) => (
                                        <ListItem
                                            key={history.id}
                                            sx={{
                                                bgcolor: "rgba(0,0,0,.05)",
                                                borderBottom:
                                                    "1px solid #c0c0c0",
                                                width: "500px",
                                            }}
                                        >
                                            <ListItemText
                                                primary={history.message}
                                                secondary={dateFormatter(
                                                    history.created_at
                                                )}
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem
                                        sx={{
                                            bgcolor: "rgba(0,0,0,.1)",
                                            width: "500px",
                                        }}
                                    >
                                        <ListItemText primary="No history." />
                                    </ListItem>
                                )}
                            </List>
                        </Demo>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}
