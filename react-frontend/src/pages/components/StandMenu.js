import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';
import Slide from '@material-ui/core/Slide';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class StandMenu extends React.Component {
  state = {
    stand: {},
    items: [],
    open: false,
  };
  renderItems = ({ Stand_ID, Item_ID, Item_Name, Item_Price }) =>
    <TableRow key={Item_ID}>
      <TableCell component="th" scope="row">
          {Item_Name}
      </TableCell>
      <TableCell align="right">{Item_Price}</TableCell>
    </TableRow>
  
  fetchmenu = sID => {
    fetch(`http://157.230.172.23:4000/standmenu/${sID}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(result => console.log(`${result.itemList}`))
      .then(result => this.setState({ items: result.itemList }))
      .catch(err => console.log(err))
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll, stand: this.props.stand});
    console.log(this.props.stand.Stand_ID)
    this.fetchmenu(this.props.stand.Stand_ID);
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {items} = this.state
    return (
      <div>
        <IconButton onClick={this.handleClickOpen('scroll')} style = {{textTransform: 'none', outline: 0, border: 'none',}}> 
          <InfoIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent = {Transition}
          scroll='body'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
          {`${this.state.stand.Stand_Name} Menu`}
          </DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableCell>Item Name</TableCell>
                <TableCell align = "right">Price</TableCell>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>
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