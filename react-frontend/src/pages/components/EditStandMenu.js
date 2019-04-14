import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function EditStandMenu(props)
{
    return(
        <div style={{textAlign: "center", width: '90%', margin: 'auto'}}>
        <Dialog
          open={props.val.openEditMenu}
          TransitionComponent={Transition}
          keepMounted
          onClose={props.handleClose}
          maxWidth='xl'
          fullWidth='true'
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{textAlign: "center"}}
        >
        <DialogContent>
          <h3>{`Edit ${props.val.stand.Stand_Name} Menu`}</h3>
          <Grid container spacing = {8} direction = "row" justify = "center" alignItems="center">
            <Grid item xs = {4}>
              <h5>Currently on Menu</h5>
              <Table>
                <TableBody>
                  {props.val.items.map(props.renderItems)}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={3}>
              <Button>Button</Button>
            </Grid>
            <Grid item xs = {4}>
            <h5>Not on Menu</h5>
            <Table>
                <TableBody>
                  {props.val.other.map(props.renderItems)}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        </Dialog>
        </div>
    )
}
export default EditStandMenu