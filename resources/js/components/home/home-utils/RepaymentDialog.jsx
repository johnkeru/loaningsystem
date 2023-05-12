import { Button, DialogActions, IconButton, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React from "react";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";
import PaymentIcon from "@mui/icons-material/Payment";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../../utils/InputField";
import { useDispatch } from "react-redux";
import { init } from "../../../store/reducers/borrowers_slice";

import { notifySuccess } from "../../../global/styles/toastify";

export default function RepaymentDialog({ lender_id, maximum }) {
    const { token, modifyUser, user } = useAuth();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePayment = ({ payment }) => {
        axios
            .post(
                auth.PAYMENT,
                {
                    lender_id,
                    payment_amount: Number(payment).toFixed(2),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                notifySuccess(`Payment successful!`);
                modifyUser(res.data.user);
                dispatch(init(res.data.borrower_data));
                handleClose();
            });
    };

    const validationSchema = Yup.object().shape({
        payment: Yup.number()
            .typeError("Payment must be a valid number")
            .required("Insert amount")
            .max(
                user?.money,
                `Payment cannot exceed your current balance of ${user?.money}.`
            ),
    });

    return (
        <div>
            <Tooltip title="payment" placement="right">
                <IconButton
                    onClick={handleClickOpen}
                    sx={{
                        ":hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    <PaymentIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Repayment</DialogTitle>
                <Formik
                    initialValues={{ payment: 0 }}
                    onSubmit={handlePayment}
                    validationSchema={validationSchema}
                >
                    {({ errors, values }) => (
                        <Form>
                            <DialogContent sx={{ py: 0 }}>
                                <InputField
                                    variant="standard"
                                    label={"Payment Amount"}
                                    name="payment"
                                    placeholder={`₱1 - ${maximum}`}
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
                                        !!errors.payment ||
                                        values.payment === 0 ||
                                        user?.money < values.payment
                                    }
                                >
                                    Repay
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}
