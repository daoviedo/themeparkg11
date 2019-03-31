import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}
function AddEmployeeDialogue(props) {
  return (
    <div>
        <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
          Add New Employee
        </Button>
        <Dialog
          open={props.val.openDialogue}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"New Employee Details"}
          </DialogTitle>
          <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField required id="firstname" label="First Name" 
              value={props.val.firstname} 
              onChange={e => props.handleChange('firstname', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="lastname" label="Last Name"
               value={props.val.lastname} 
               onChange={e => props.handleChange('lastname', e.target.value)} fullWidth />
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.submitForm} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default AddEmployeeDialogue;