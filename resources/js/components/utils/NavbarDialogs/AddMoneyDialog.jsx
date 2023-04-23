import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link'
import { Form, Formik } from 'formik';

import auth from '../../../global/urls/auth'
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import InputField from '../InputField';

export default function AddMoneyDialog({user}) {
  const [open, setOpen] = React.useState(false);

  const {modifyUser, token} = useAuth()

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMoney = ({money}, {setErrors}) => {
    axios.patch(auth.ADD_MONEY, {money}, {headers: {
      Authorization: `Bearer ${token}`
    }})
      .then((res) => {
        const respo = res.data
        if(respo?.data){
          setErrors({'money' : respo.data.message})
          return;
        }
        if(!respo.success){
          setErrors({'money' : respo.message})
          return;
        }
        modifyUser(respo.user)
        handleClose();
      })
      .catch(() => alert('Something went wrong!'));
  }

  return (
    <div>
        <Link sx={{cursor: 'pointer'}}
          underline="hover"
          color="inherit"
          onClick={handleClickOpen}
        >
          Add Money
        </Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Current money: {user?.money}</DialogTitle>
          <Formik initialValues={{money: 0}} onSubmit={handleAddMoney}>
              <Form>
                <DialogContent>
                  <InputField
                    name='money'
                    placeholder='1-1,000,000,000'
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='secondary'>Cancel</Button>
                  <Button type='submit'>Add</Button>
                </DialogActions>
              </Form>
            </Formik>
        </Dialog>
    </div>
  );
}
