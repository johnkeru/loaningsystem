import { Box, ButtonGroup, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";
import { add_lender } from "../../../store/reducers/lenders_slice";
import InputField from "../../utils/InputField";

import { notifySuccess } from "../../../global/styles/toastify";

export default function LenderDialog({ title }) {
    const { token, user, modifyUser } = useAuth();
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLend = ({ amount, interest }, { setErrors }) => {
        axios
            .post(
                auth.CREATE_LENDER,
                {
                    amount: Number(amount).toFixed(2),
                    interest: Number(interest).toFixed(2),
                    lender_name: user.name,
                    lender_email: user.email,
                    lender_avatar: user.avatar,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                const respo = res.data;
                const error = {};
                if (respo?.data) {
                    error[respo.data.field] = respo.data.message;
                    if (respo?.data) {
                        setErrors(error);
                        return;
                    }
                    if (!respo.success) {
                        setErrors({ amount: respo.message });
                        return;
                    }
                }
                notifySuccess(`You have successfully lent money!`);
                dispatch(add_lender(respo.lender));
                modifyUser(respo.user);
                handleClose();
            })
            .catch((e) => alert("Something went wrong!", e));
    };

    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .typeError("Amount must be a valid number")
            .required("Amount is required")
            .max(user?.money, `Amount can't exceed ${user?.money}`)
            .min(0, "Amount can't be negative"),
        interest: Yup.number()
            .typeError("Interest must be a valid number")
            .min(0, "Interest rate cannot be negative")
            .max(25, "Interest rate cannot exceed 25%")
            .required("Interest rate is required"),
    });

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        py: 2,
        px: 3,
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
                {title}
            </Typography>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        mb={3}
                        color={user?.money ? "black" : "error"}
                    >
                        {user?.money !== 0
                            ? title
                            : "You don't have enough balance to lend."}
                    </Typography>
                    <Formik
                        initialValues={{ amount: 0, interest: 0 }}
                        onSubmit={handleLend}
                        validationSchema={validationSchema}
                    >
                        {({ errors, values }) => (
                            <Form>
                                <InputField
                                    label={"Amount"}
                                    variant="standard"
                                    name="amount"
                                    placeholder={`₱1 - ${user?.money}`}
                                />
                                <InputField
                                    label={"Interest (0-25%)"}
                                    variant="standard"
                                    name="interest"
                                    placeholder="0 - 25%"
                                />
                                <ButtonGroup
                                    sx={{
                                        display: "flex",
                                        justifyContent: "end",
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={handleClose}
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={
                                            errors.interest === 0 ||
                                            values.amount === 0 ||
                                            !!errors.amount ||
                                            !!errors.interest
                                        }
                                        variant="contained"
                                        type="submit"
                                    >
                                        Lend
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}
