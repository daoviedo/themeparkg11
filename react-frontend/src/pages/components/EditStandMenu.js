import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { Table, TableRow, TableCell,TableBody } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EditStandMenu extends Component
{
  state={
    remselect: [],
    addselect: [],
  }
  handleClickAdd = () =>{
    console.log(this.state.addselect)
    this.props.additems(this.props.val.stand.Stand_ID, this.state.addselect)
    this.setState({addselect:[]})
  }
  handleClickRemove = () =>{
    console.log(this.state.remselect)
    this.props.remitems(this.props.val.stand.Stand_ID, this.state.remselect)
    this.setState({remselect:[]})
  }
  handleClickMenu = (event, id) => {
    const { remselect } = this.state;
    const selectedIndex = remselect.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(remselect, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(remselect.slice(1));
    } else if (selectedIndex === remselect.length - 1) {
      newSelected = newSelected.concat(remselect.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        remselect.slice(0, selectedIndex),
        remselect.slice(selectedIndex + 1),
      );
    }
    this.setState({ remselect: newSelected });
  };

  handleClickOther = (event, id) => {
    const { addselect } = this.state;
    const selectedIndex = addselect.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(addselect, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(addselect.slice(1));
    } else if (selectedIndex === addselect.length - 1) {
      newSelected = newSelected.concat(addselect.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        addselect.slice(0, selectedIndex),
        addselect.slice(selectedIndex + 1),
      );
    }
    this.setState({ addselect: newSelected });
  };
  isSelectedMenu = id => this.state.remselect.indexOf(id) !== -1;
  isSelectedOther = id => this.state.addselect.indexOf(id) !== -1;
  render(){
        return(
        <div style={{textAlign: "center", width: '90%', margin: 'auto'}}>
        <Dialog
          open={this.props.val.openEditMenu}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          maxWidth='xl'
          fullWidth={true}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          style={{textAlign: "center"}}
        >
        <DialogContent>
          <h3>{`Edit ${this.props.val.stand.Stand_Name} Menu`}</h3>
          <br/>
          <Grid container spacing = {8} direction = "row" justify="center">
            <Grid item xs = {4}>
              <h5>Currently on Menu</h5>
              <Table>
                <TableBody>
                  {this.props.val.items.map(item => {
                      const isSelected = this.isSelectedMenu(item.Item_ID);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClickMenu(event, item.Item_ID)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={item.Item_ID}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {item.Item_Name}
                          </TableCell>
                          <TableCell align="right">${item.Item_Price.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Grid>
            <Grid container item xs = {3} spacing={16} direction="column" justify = "center" alignItems="center">
            <Grid item xs={3}>
            <IconButton onClick={()=>this.handleClickAdd()}>
              <ArrowBackIos color = "primary"/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton onClick={()=>this.handleClickRemove()}>
              <ArrowForwardIos color = "primary"/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={this.props.handleClose} variant = "outlined" color = "primary">Done</Button>
            </Grid>
            </Grid>
            <Grid item xs = {4}>
            <h5>Not on Menu</h5>
            <Table>
                <TableBody>
                  {this.props.val.other.map(item => {
                      const isSelected = this.isSelectedOther(item.Item_ID);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClickOther(event, item.Item_ID)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={item.Item_ID}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {item.Item_Name}
                          </TableCell>
                          <TableCell align="right">${item.Item_Price.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        </Dialog>
        </div>
    );}
}
export default withStyles(styles)(EditStandMenu)