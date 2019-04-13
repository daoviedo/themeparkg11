import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField, MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
function AddStandDialogue(props) {
  return (
    <div>
        <Fab size="medium" aria-label="Add-stand" onClick = {props.open}>
            <AddIcon />
        </Fab>
        <Dialog
          open={props.val.openAddStand}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleCloseAddStand}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{textAlign: "center"}}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"New Stand Details"}
          </DialogTitle>
          <DialogContent align = "center">
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField required id="standname" label="Stand Name" 
              value={props.val.standname} 
              onChange={e => props.handleChange('standname', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="hours" label="Hours of Operation"
               value={props.val.hours} 
               onChange={e => props.handleChange('hours', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
            <Button onClick={props.handleCloseAddStand} variant = "outlined" color="secondary">
              Cancel
            </Button>
            </Grid>
            <Grid item xs={12} md={6}>
            <Button onClick={props.submitStand} variant = "outlined" color="primary">
              Submit
            </Button>
            </Grid>
          </Grid>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default AddStandDialogue;