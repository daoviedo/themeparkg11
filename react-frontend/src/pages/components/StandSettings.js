import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditStandMenu from './EditStandMenu';

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  });

class StandSettings extends Component
{
    state ={
        stand: this.props.stand,
        openEditMenu: false,
        items: [],
        other: [],
    }
  addToMenu = (sid, items) =>{
      console.log(sid, items, 'stand settings');
      fetch(`http://157.230.172.23:4000/addtomenu`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              sid: sid,
              list: items
          }),
      })
      .then(()=>{
        this.fetchmenu();
        this.fetchother();
      })
      .catch(err => console.log(err))
  }
  removeFromMenu = (sid, items) =>{
      console.log(sid, items, 'stand settings');
      fetch(`http://157.230.172.23:4000/removefrommenu`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              sid: sid,
              list: items
          }),
      })
      .then(()=>{
        this.fetchmenu();
        this.fetchother();
    })
      .catch(err => console.log(err))
  }
    handleOpenEditMenu = () => {
      this.setState({openEditMenu: true });
    };
    handleCloseEditMenu = () =>
    {
      this.setState({openEditMenu: false, addselect: [], remselect: []})
    };
    componentDidMount()
    {
        this.fetchmenu()
        this.fetchother()
    }
    fetchother(){
      fetch(`http://157.230.172.23:4000/notonmenu/${this.state.stand.Stand_ID}`, {
        method: "GET",
      })
        .then(res => res.json())
        .then(result => this.setState({ other: result.itemList }))
        .catch(err => console.log(err))
    }
    fetchmenu(){
        fetch(`http://157.230.172.23:4000/standmenu/${this.state.stand.Stand_ID}`, {
          method: "GET",
        })
          .then(res => res.json())
          .then(result => this.setState({ items: result.itemList }))
          .catch(err => console.log(err))
      }
    
    renderItems = ({ Item_ID, Item_Name, Item_Price }) =>
    <TableRow key={Item_ID}>
      <TableCell component="th" scope="row">
          {Item_Name}
      </TableCell>
      <TableCell align="right">${Item_Price.toFixed(2)}</TableCell>
    </TableRow>

    render(){
        const {classes} = this.props
    return(
        <React.Fragment>
            <div style={{textAlign: "center", margin: 'auto', width: '90%'}}>
                <Typography className={classes.secondaryHeading}>Menu</Typography>
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
            <br/>
            <Grid container spacing = {16} justify = "center">
            <Grid item xs = {6}>
            <Button variant="outlined" color="primary" 
              onClick={() => this.handleOpenEditMenu()}>Edit Menu</Button>
            </Grid>
            <Grid item xs = {6}>
            <Button variant="outlined" color="secondary" onClick={()=>this.props.openDelete(this.state.stand)}>Remove Stand</Button>
            </Grid>
            </Grid>
            <EditStandMenu val = {this.state} handleClose = {this.handleCloseEditMenu}
                    handleChange={this.props.handleChange} renderItems={this.renderItems}
                    additems = {this.addToMenu} remitems = {this.removeFromMenu}/>
            </div>
        </React.Fragment>
    );}
}

export default withStyles(styles)(StandSettings);