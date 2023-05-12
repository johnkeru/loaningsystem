import { Grid } from "@mui/material";
import React from "react";
import LenderDialog from "./LenderDialog";
import BorrowerDialog from "./BorrowerDialog";
import PrincipalsDialog from "./PrincipalsDialog";
import LenderAdditionDialog from "./LenderAdditionDialog";
import SideProfileBorrowedFrom from "./SideProfileBorrowedFrom";
import { useSelector } from "react-redux";

const Card = ({ src, title }) => {
    const borrowers = useSelector((root) => root.borrowersSlice);

    return (
        <Grid
            width={400}
            height={300}
            mb="30px"
            position="relative"
            boxShadow={3}
            sx={{
                ":hover": {
                    boxShadow: 10,
                },
            }}
        >
            <img src={src} alt="" width="100%" height="100%" style={{ blur }} />

            <Grid
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0, .3)",
                    ":hover": {
                        background: "rgba(0,0,0,.1)",
                    },
                }}
            />

            <Grid
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {title === "Be a borrower" && <BorrowerDialog title={title} />}
                {title === "Be a lender" && <LenderDialog title={title} />}
                {title === "Additional Lend" && (
                    <LenderAdditionDialog title={title} />
                )}
                {title === "Principals" && <PrincipalsDialog title={title} />}
                {title === "Repayment" && (
                    <SideProfileBorrowedFrom
                        borrowed_from_count={borrowers.borrowed_from_count}
                        borrowed_from_list={borrowers.borrowed_from_list}
                    />
                )}
            </Grid>

            <Grid />
        </Grid>
    );
};

export default Card;
