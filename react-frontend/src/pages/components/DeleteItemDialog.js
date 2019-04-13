import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
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
                aria-labelledby="scroll-dialog-title"
                >
                <DialogTitle id="scroll-dialog-title" align = "center">
                    {`Are you sure you want to delete ${props.item.Item_Name}?`}
                </DialogTitle>
                <DialogContent>
            <DialogActions align = "center">
            <Grid container spacing = {16} justify = "center">
            <Grid item xs = {6}>
            <Button onClick={props.close} variant="outlined" color="secondary">Cancel</Button>
            </Grid>
            <Grid item xs = {6}>
            <Button onClick={()=>props.confirm(props.item.Item_ID)} variant="outlined" color="primary">Confirm</Button>
            </Grid>
            </Grid>
            </DialogActions>
          </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteItemDialog