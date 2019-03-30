import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField, MenuItem } from '@material-ui/core';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function MaintenanceDialogue(props) {
  return (
    <div>
        <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
          Create New Maintenance Order
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
            {"Maintenance Order Form"}
          </DialogTitle>
          <DialogContent>
            <TextField select required label="Ride" name="selectedRide" onChange={props.handleChange} value={props.val.selectedRide} style={{width: 200}}>
                        {props.val.listOfRides.map(option => (
                            <MenuItem key={option.RideID} value={option.RideID}>
                            {option.RideName}
                            </MenuItem>
                            )
                        )}
            </TextField>
            <br/>
            <TextField
                label="Description"
                name="description"
                multiline
                rows="4"
                value={props.val.description}
                onChange={props.handleChange}
                style={{width: 300}}
                margin="normal"
                variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.submitForm} color="primary" disabled={props.val.selectedRide === ""}>
              Place Order
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default MaintenanceDialogue;