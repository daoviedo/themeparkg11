import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaintenanceDialogue from './components/MaintenanceDialogue';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MaintDesc from './components/MaintDesc';

const styles = theme => ({
    root: {
        width: '70%',
        maxHeight: 500,
        marginTop: 20,
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
    },
    button: {
        "&:hover": {
          backgroundColor: "transparent"
        }
    }
});

class Maintenance extends Component {
    state = {
        maintList : [],
        userID: localStorage.getItem('userID'),
        openDialogue: false,
        rightDialogue: false,
        dialogueDesc: "",
        listOfRides: [],
        selectedRide: "",
        description: "",
        rainout: 0
    }

    componentDidMount(){
        this.fetchMaintenance();
        this.fetchRides();
        this.fetchRainout();
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

    fetchRainout(){
        fetch(`http://157.230.172.23:4000/rainout`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rainout: result.rainedOut }))
            .catch(err => console.log(err))
    }

    rainoutPark(){
        fetch(`http://157.230.172.23:4000/nrainout`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rainout: result.rainedOut }))
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
                completedBy: this.state.userID,
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

    handleRightOpen = (desc) => {
        this.setState({ dialogueDesc: desc, rightDialogue: true });
    };
    
    handleRightClose = () => {
        this.setState({ rightDialogue: false, dialogueDesc: "" });
    };

    submitForm = () => {
        fetch(`http://157.230.172.23:4000/newmaintenance`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rideID: this.state.selectedRide,
                employeeID: this.state.userID,
                description: this.state.description
            }),
        })
        .then(()=>this.fetchMaintenance())
        .then(this.handleClose())
        .catch(err => console.log(err))
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    renderMainList = ({ OrderID, DateCreated, RideName, FirstName, LastName, Maintenance_Desc }) =>
        <TableRow key={OrderID}>
            <TableCell component="th" scope="row">
                <IconButton className={this.props.classes.button} onClick={()=>this.handleRightOpen(Maintenance_Desc)} style={{textTransform: 'none', outline: 0, border: 'none',marginBottom: 3, marginLeft: -20, marginRight: -10,}}>
                  <InfoIcon/>
                </IconButton>
                {OrderID}
            </TableCell>
            <TableCell align="right">{DateCreated.split(".")[0]}</TableCell>
            <TableCell align="right">{RideName}</TableCell>
            <TableCell align="right">{FirstName + " " + LastName}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.completeOrder(OrderID)}>Complete Order</Button></TableCell>
        </TableRow>

    rainButton(){
        if(this.state.rainout === 0){
            return <Button variant="outline-danger" onClick={()=>this.rainoutPark()} style={{marginTop: 10}}>Rainout Park</Button>;
        }
        else{
            return <Button disabled variant="danger" style={{marginTop: 10}}>Park is Rained Out for Today</Button>;
        }
    }

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
                <MaintDesc handleRightClose={this.handleRightClose} val={this.state}/>
                {this.rainButton()}
                </div>
            </React.Fragment>
        );
    }
}

Maintenance.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Maintenance);