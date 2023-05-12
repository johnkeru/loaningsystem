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
    styled,
    tableCellClasses,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SideProfileBorrowers = ({ borrowers_count, borrowers_list }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Grid display="flex" mt={3} onClick={handleOpen}>
                <PeopleIcon />
                <Typography
                    sx={{
                        fontSize: "1rem",
                        ml: 2,
                        cursor: "pointer",
                        ":hover": { textDecoration: "underline" },
                    }}
                >
                    {borrowers_count}{" "}
                    {borrowers_count > 1 ? "borrowers" : "borrower"}
                </Typography>
            </Grid>
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
                    {" "}
                    {borrowers_count > 1 ? "borrowers" : "borrower"}
                </DialogTitle>
                <DialogContent>
                    <BorrowersTable borrowers_list={borrowers_list} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SideProfileBorrowers;

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

const BorrowersTable = ({ borrowers_list }) => {
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
                                        borrower.user_borrowers.avatar ||
                                        "avatar.png"
                                    }
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <Typography ml={1}>
                                    {borrower.user_borrowers.name}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {borrower.user_borrowers.email}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
