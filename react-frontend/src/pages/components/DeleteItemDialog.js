import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function DeleteItemDialog(props){
    return(
        <div>
            <Dialog
                open={props.val.openDeleteItem}
                onClose={props.close}
                TransitionComponent={Transition}
                scroll='body'
                aria-labelledby="scroll-dialog-title"
                >
                <DialogTitle id="scroll-dialog-title" align = "center">
                    {`Are you sure you want to delete ${props.item.Item_Name}?`}
                </DialogTitle>
                <DialogContent>
            <DialogContentText align = "center">
            <Button variant="contained" color="secondary">
              DELETE ITEM
            </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Close
            </Button>
          </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteItemDialog