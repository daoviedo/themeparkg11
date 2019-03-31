import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogContentText from '@material-ui/core/DialogContentText';

function Transition(props) {
    return <Slide direction="right" {...props} />;
}

function MaintDesc(props) {
  return (
    <div>
        <Dialog
          open={props.val.rightDialogue}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleRightClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Maintenance Description"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.val.dialogueDesc}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleRightClose} color="primary">
              CLose
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default MaintDesc;