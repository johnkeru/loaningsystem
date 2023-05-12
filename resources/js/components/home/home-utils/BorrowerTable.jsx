import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { IconButton, Tooltip, Typography, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../global/urls/auth";
import useAuth from "../../../hooks/useAuth";
import { init_lenders } from "../../../store/reducers/lenders_slice";
import BorrowCreateDialog from "./BorrowCreateDialog";
import LenderDeleteDialog from "./LenderDeleteDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function BorrowerTable() {
    const lenders = useSelector((state) => state.lendersSlice.lenders);
    const { token, user, modifyUser } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            axios
                .get(auth.LENDERS, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    dispatch(init_lenders(res.data.lenders));
                });
        }
    }, [token]);
    return (
        <>
            {lenders.length === 0 ? (
                <Typography variant="h5" textAlign="center" color="gray">
                    No lenders yet.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    Amount
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    Interest
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    Lender Name
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    Lender Email
                                </StyledTableCell>
                                <StyledTableCell
                                    sx={{ fontWeight: 600, color: "#333" }}
                                >
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lenders.map((lender) => (
                                <StyledTableRow
                                    key={lender.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {lender.amount}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {lender.interest}%
                                    </StyledTableCell>
                                    <StyledTableCell
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={
                                                lender?.lender_avatar ||
                                                "avatar.png"
                                            }
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                        <Typography ml={1}>
                                            {lender.lender_name}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {lender.lender_email}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {user?.id === lender.user_id ? (
                                            <LenderDeleteDialog
                                                amount={lender.amount}
                                                id={lender.id}
                                                modifyUser={modifyUser}
                                                token={token}
                                            />
                                        ) : undefined}
                                        {user?.id === lender.user_id ? (
                                            <Tooltip
                                                title="You cannot borrow from yourself"
                                                placement="right"
                                            >
                                                <IconButton>
                                                    <RequestQuoteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <BorrowCreateDialog
                                                lender={lender}
                                            />
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}
