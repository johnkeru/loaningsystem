import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { Form, Formik } from "formik";
import React from "react";

import { Typography } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";
import InputField from "../InputField";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../global/styles/toastify.css";
import { notifySuccess } from "../../../global/styles/toastify";

export default function AddMoneyDialog({ inProfile }) {
    const [open, setOpen] = React.useState(false);
    const { modifyUser, token, user } = useAuth();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validationSchema = Yup.object().shape({
        money: Yup.number()
            .typeError("Money must be a valid number")
            .required("Insert any amount")
            .max(1_000_000_000, `money cannot exceed 1b`),
    });

    const handleAddMoney = ({ money }, { setErrors }) => {
        axios
            .patch(
                auth.ADD_MONEY,
                { money: Number(money).toFixed(2) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                const respo = res.data;
                if (respo?.data) {
                    setErrors({ money: respo.data.message });
                    return;
                }
                if (!respo.success) {
                    setErrors({ money: respo.message });
                    return;
                }
                modifyUser(respo.user);
                notifySuccess(`Deposit of ₱${money} was successful!`);
                handleClose();
            })
            .catch(() => alert("Something went wrong!"));
    };

    return (
        <div>
            <ToastContainer />
            {!inProfile ? (
                <Link
                    sx={{ cursor: "pointer" }}
                    underline="hover"
                    color="inherit"
                    onClick={handleClickOpen}
                >
                    Deposit
                </Link>
            ) : (
                <Button
                    sx={{
                        py: 1.5,
                        border: 2,
                        borderColor: "primary.main",
                        fontWeight: 600,
                        ":hover": {
                            bgcolor: "primary.main",
                            color: "#ffffff",
                        },
                    }}
                    fullWidth
                    endIcon={<AddIcon />}
                    onClick={handleClickOpen}
                >
                    Deposit
                </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Balance: {user?.money.toFixed(2)}</DialogTitle>
                <Formik
                    initialValues={{ money: 0 }}
                    onSubmit={handleAddMoney}
                    validationSchema={validationSchema}
                >
                    {({ errors, values }) => (
                        <Form>
                            <DialogContent sx={{ py: 0 }}>
                                <Typography
                                    color={errors.money ? "red" : "green"}
                                    sx={{ pb: 2 }}
                                >
                                    Min: 1 & Max: 1b
                                </Typography>

                                <InputField
                                    variant="outlined"
                                    label={"Amount (1-1b)"}
                                    name="money"
                                    placeholder="₱1 - 1,000,000,000"
                                />
                            </DialogContent>
                            <DialogActions sx={{ mr: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={
                                        !!errors.money || values.money === 0
                                    }
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}
