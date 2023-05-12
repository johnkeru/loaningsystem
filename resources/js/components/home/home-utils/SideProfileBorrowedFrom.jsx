import { HighlightOffOutlined } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    styled,
    tableCellClasses,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import RepaymentDialog from "./RepaymentDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SideProfileBorrowedFrom = ({
    borrowed_from_count,
    borrowed_from_list,
    inProfile,
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {inProfile ? (
                <Grid display="flex" mt={1} onClick={handleOpen}>
                    <PeopleIcon />
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            ml: 2,
                            cursor: "pointer",
                            ":hover": { textDecoration: "underline" },
                        }}
                    >
                        Borrowed from {borrowed_from_count}{" "}
                        {borrowed_from_count > 1 ? "lenders" : "lender"}
                    </Typography>
                </Grid>
            ) : (
                <Typography
                    onClick={handleOpen}
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
                    Repayment
                </Typography>
            )}
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
                    Borrowed from {borrowed_from_count}{" "}
                    {borrowed_from_count > 1 ? "lenders" : "lender"}
                </DialogTitle>
                <DialogContent>
                    <BorrowersTable
                        borrowers_list={borrowed_from_list}
                        inProfile={inProfile}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SideProfileBorrowedFrom;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.error.main,
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

const BorrowersTable = ({ borrowers_list, inProfile }) => {
    const dateFormatter = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString("en-US");
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Date
                        </StyledTableCell>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Borrowed
                        </StyledTableCell>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Interest
                        </StyledTableCell>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Payback
                        </StyledTableCell>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Name
                        </StyledTableCell>
                        <StyledTableCell
                            sx={{ fontWeight: 600, color: "#333" }}
                        >
                            Email
                        </StyledTableCell>
                        {!inProfile && (
                            <StyledTableCell
                                sx={{ fontWeight: 600, color: "#333" }}
                            >
                                Action
                            </StyledTableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {borrowers_list.map((borrower) => (
                        <StyledTableRow
                            key={borrower.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {dateFormatter(borrower.created_at)}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {borrower.borrowed}
                            </StyledTableCell>
                            <StyledTableCell>
                                {borrower.interest}%
                            </StyledTableCell>
                            <StyledTableCell>
                                {borrower.borrowed_amount}
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={
                                        borrower.user_lenders.avatar ||
                                        "avatar.png"
                                    }
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Typography ml={1}>
                                    {borrower.user_lenders.name}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {borrower.user_lenders.email}
                            </StyledTableCell>
                            {!inProfile && (
                                <StyledTableCell>
                                    <RepaymentDialog
                                        title="Payment"
                                        lender_id={borrower.user_lenders.id}
                                        maximum={borrower.borrowed_amount}
                                    />
                                </StyledTableCell>
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
