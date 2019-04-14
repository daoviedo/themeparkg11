import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import InfoIcon from '@material-ui/icons/Info';
import Slide from '@material-ui/core/Slide';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class StandMenu extends React.Component {
  state = {
    stand: this.props.stand,
    items: [],
    open: false,
  };
  renderItems = ({ Item_ID, Item_Name, Item_Price }) =>
    <TableRow key={Item_ID}>
      <TableCell component="th" scope="row">
          {Item_Name}
      </TableCell>
      <TableCell align="right">${Item_Price.toFixed(2)}</TableCell>
    </TableRow>
  
  fetchmenu(){
    fetch(`http://157.230.172.23:4000/standmenu/${this.state.stand.Stand_ID}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(result => this.setState({ items: result.itemList }))
      .catch(err => console.log(err))
  }

  handleClickOpen = _ => {
    this.fetchmenu();
    this.setState({ open: true});
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen} style = {{textTransform: 'none', outline: 0, border: 'none', color: "white", opacity: .6}}> 
          <InfoIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent = {Transition}
          scroll='body'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title" align = "center">
          {`${this.state.stand.Stand_Name} Menu`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText align = "center">
              {`${this.state.stand.Hours_of_operations}`}
            </DialogContentText>
            <div style={{height: "60vh", overflowY: 'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align = "right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map(this.renderItems)}
              </TableBody>
            </Table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StandMenu;