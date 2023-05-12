import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import LogoutDialog from "./NavbarDialogs/LogoutDialog";
import AddMoneyDialog from "./NavbarDialogs/AddMoneyDialog";
import useAuth from "../../hooks/useAuth";

export default function Navbar_Breadcrumps() {
    const { user, destroy } = useAuth();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <AddMoneyDialog />
            <LogoutDialog user={user} destroy={destroy} />
        </Breadcrumbs>
    );
}
