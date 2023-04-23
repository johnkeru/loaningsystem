import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import LogoutDialog from './NavbarDialogs/LogoutDialog';
import AddMoneyDialog from './NavbarDialogs/AddMoneyDialog';
import useAuth from '../../hooks/useAuth';

export default function Navbar_Breadcrumps() {
    const {user, destroy} = useAuth()

    return (
      <div role="presentation" >
        <Breadcrumbs aria-label="breadcrumb">
          <AddMoneyDialog user={user}/>
          <LogoutDialog user={user} destroy={destroy}/>
        </Breadcrumbs>
      </div>
    );
}