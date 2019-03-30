import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaintenanceDialogue from './components/MaintenanceDialogue';

const styles = theme => ({
    root: {
        width: '70%',
        maxHeight: 500,
        marginTop: 100,
        margin: 'auto',
        overflowX: 'auto',
        overflowY: 'auto'
    },
    table: {
        minWidth: 700,
    },
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#2F4F4F',
        color: 'white'
    }
});

class Maintenance extends Component {
    state = {
        maintList : [],
        userID: 1,
        openDialogue: false,
        listOfRides: [],
        selectedRide: "",
        description: ""
    }

    componentDidMount(){
        this.fetchMaintenance();
        this.fetchRides();
    }

    fetchMaintenance(){
        fetch(`http://157.230.172.23:4000/maintenance_needed`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ maintList: result.mainList }))
            .catch(err => console.log(err))
    }

    fetchRides(){
        fetch(`http://157.230.172.23:4000/ridelist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ listOfRides: result.rideList }))
            .catch(err => console.log(err))
    }

    completeOrder(order_id){
        fetch(`http://157.230.172.23:4000/fixmaintenance`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: order_id,
                completedBy: this.state.userID
            }),
        })
        .then(()=>this.fetchMaintenance())
        .catch(err => console.log(err))
    }

    handleClickOpen = () => {
        this.setState({ openDialogue: true });
    };
    
    handleClose = () => {
        this.setState({ openDialogue: false, selectedRide: "", description: "" });
    };

    submitForm = () => {
        fetch(`http://157.230.172.23:4000/newmaintenance`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rideID: this.state.selectedRide,
                employeeID: this.state.userID
            }),
        })
        .then(()=>this.fetchMaintenance())
        .then(this.handleClose())
        .catch(err => console.log(err))
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    renderMainList = ({ OrderID, DateCreated, Rides_ID, Employee_ID, RideName, FirstName, LastName }) =>
        <TableRow key={OrderID}>
            <TableCell component="th" scope="row">
                {OrderID}
            </TableCell>
            <TableCell align="right">{DateCreated.split(".")[0]}</TableCell>
            <TableCell align="right">{RideName}</TableCell>
            <TableCell align="right">{FirstName + " " + LastName}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.completeOrder(OrderID)}>Complete Order</Button></TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { maintList } = this.state;
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Maintenance Page</h1>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.header}>Order ID</TableCell>
                                    <TableCell align="right" className={classes.header}>Date Submitted</TableCell>
                                    <TableCell align="right" className={classes.header}>Ride</TableCell>
                                    <TableCell align="right" className={classes.header}>Issued By</TableCell>
                                    <TableCell align="right" className={classes.header}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody >
                            {maintList.map(this.renderMainList)}
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
                <MaintenanceDialogue handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} submitForm={this.submitForm} handleChange={this.handleChange} val={this.state}/>
                </div>
            </React.Fragment>
        );
    }
}

Maintenance.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Maintenance);