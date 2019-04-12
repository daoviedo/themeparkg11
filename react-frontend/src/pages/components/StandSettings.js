import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
        items: []
    }
    componentDidMount()
    {
        this.fetchmenu()
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
      <TableCell align="right">${Item_Price}.00</TableCell>
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
            <Button variant="outlined" color="primary">Edit Menu</Button>
            </Grid>
            <Grid item xs = {6}>
            <Button variant="outlined" color="secondary">Remove Stand</Button>
            </Grid>
            </Grid>
            </div>
        </React.Fragment>
    );}
}

export default withStyles(styles)(StandSettings);