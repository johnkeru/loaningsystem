import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import {
    Box,
    ButtonGroup,
    Grid,
    IconButton,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import InputField from "../../utils/InputField";

import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";

import axios from "axios";
import * as Yup from "yup";
import { init } from "../../../store/reducers/borrowers_slice";
import { update_lender } from "../../../store/reducers/lenders_slice";

import { notifySuccess } from "../../../global/styles/toastify";

export default function BorrowCreateDialog({ lender }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { token, modifyUser } = useAuth();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateBorrower = (values) => {
        axios
            .post(
                auth.CREATE_BORROWER,
                {
                    lender_id: lender.user_id,
                    lend_id: lender.id,
                    borrowed: Number(values.amount),
                    borrowed_amount: sum(values),
                    interest: lender.interest,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                dispatch(init(res.data.borrower_data));
                modifyUser(res.data.borrower);
                dispatch(update_lender(res.data.lend));
                notifySuccess(
                    `Successfully borrowed ₱${values.amount} from ${lender.lender_name}`
                );

                handleClose();
            })
            .catch((err) => console.log(err));
    };

    function sum(values) {
        let interest = lender.interest;
        if (interest > 0 && interest <= 9) {
            interest = eval(`0.0${lender.interest}`);
        } else {
            interest = eval(`0.${lender.interest}`);
        }
        const val = values.amount * interest;
        return Number(values.amount) + val;
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .typeError("Amount must be a valid number")
            .required("Amount is required")
            .max(lender.amount, `Amount cannot exceed ${lender.amount}`),
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
        <>
            <Tooltip title="borrow" placement="right">
                <IconButton
                    onClick={handleClickOpen}
                    sx={{
                        ":hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    <RequestQuoteIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Formik
                        onSubmit={handleCreateBorrower}
                        initialValues={{ amount: 0 }}
                        validationSchema={validationSchema}
                    >
                        {({ errors, values }) => (
                            <Box>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h5"
                                    component="h2"
                                    mb={1}
                                >
                                    Borrow from {lender.lender_name}
                                </Typography>
                                <Form>
                                    <DialogTitle
                                        fontSize="25px"
                                        fontWeight={600}
                                    ></DialogTitle>
                                    <InputField
                                        variant="standard"
                                        label={`Maximum of ${lender.amount}`}
                                        name="amount"
                                        placeholder={
                                            "Amount you want to borrow"
                                        }
                                    />

                                    {!errors.amount ? (
                                        values.amount ? (
                                            <Grid>
                                                <Typography>
                                                    Total payback amount:
                                                </Typography>
                                                <Typography
                                                    py={1}
                                                    fontWeight={600}
                                                >
                                                    ₱{sum(values)}
                                                </Typography>
                                                <Typography>
                                                    (including {lender.interest}
                                                    % interest).
                                                </Typography>
                                            </Grid>
                                        ) : (
                                            <Typography py={1}>
                                                (including {lender.interest}%
                                                interest).
                                            </Typography>
                                        )
                                    ) : undefined}
                                    <ButtonGroup
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                            mt: 2,
                                        }}
                                    >
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            disabled={
                                                !!errors.amount ||
                                                values.amount === 0
                                            }
                                        >
                                            Borrow
                                        </Button>
                                    </ButtonGroup>
                                </Form>
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}
