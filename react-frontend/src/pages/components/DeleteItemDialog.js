import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, MenuItem } from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function DeleteItemDialog(props){
    return(
        <div>
            <IconButton onClick = {props.handleOpenDeleteItem} aria-label="Delete">
                <DeleteIcon fontSize="small" />
            </IconButton>
            <Dialog
                open={props.val.openDeleteItem}
                TransitionComponent={Transition}
                onClose={props.handleCloseDeleteItem}>
                <DialogTitle>
                    {`Are you sure you want to delete ${props.Item_Name}?`}
                </DialogTitle>
            </Dialog>
        </div>
    );
}

export default DeleteItemDialog