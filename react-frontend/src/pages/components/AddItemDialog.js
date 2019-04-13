import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
function AddItemDialog(props) {
  return (
    <div>
        <Fab size="medium" aria-label="Add-item" onClick = {props.open}>
            <AddIcon />
        </Fab>
        <Dialog
          open={props.val.openAddItem}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleCloseAddItem}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{textAlign: "center"}}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"New Item Details"}
          </DialogTitle>
          <DialogContent align = "center">
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField required id="itemname" label="Item Name" 
              name="itemname"
              value={props.val.itemname} 
              onChange={props.handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField required id="price" label="Item Price"
              name="price"
               value={props.val.price} 
               onChange={props.handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
            <Button onClick={props.handleCloseAddItem} variant = "outlined" color="secondary">
              Cancel
            </Button>
            </Grid>
            <Grid item xs={12} md={6}>
            <Button onClick={props.submitItem} variant = "outlined" color="primary">
              Submit
            </Button>
            </Grid>
          </Grid>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default AddItemDialog;