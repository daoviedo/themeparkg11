import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    }

    componentDidMount(){
        this.fetchMaintenance();
    }

    fetchMaintenance(){
        fetch(`http://157.230.172.23:4000/maintenance_needed`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ maintList: result.mainList }))
            .catch(err => console.log(err))
    }

    renderMainList = ({ OrderID, DateCreated, Rides_ID, Employee_ID }) =>
        <TableRow key={OrderID}>
            <TableCell component="th" scope="row">
                {OrderID}
            </TableCell>
            <TableCell align="right">{DateCreated}</TableCell>
            <TableCell align="right">{Rides_ID}</TableCell>
            <TableCell align="right">{Employee_ID}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" >Complete Order</Button></TableCell>
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
                                    <TableCell align="right" className={classes.header}>Date Created</TableCell>
                                    <TableCell align="right" className={classes.header}>Ride ID</TableCell>
                                    <TableCell align="right" className={classes.header}>Employee ID</TableCell>
                                    <TableCell align="right" className={classes.header}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody >
                            {maintList.map(this.renderMainList)}
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            </React.Fragment>
        );
    }
}

Maintenance.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Maintenance);