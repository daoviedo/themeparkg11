import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: "40%",
    maxHeight: 500,
    marginTop: 20,
    margin: "auto",
    overflowY: "auto",
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  },
  table1: {
    minWidth: 500,
    
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#2F4F4F",
    color: "white",
    fontSize: 24
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  centerIcon: {
    color: "red",
    verticalAlign: "middle",
    fontSize: 20,
    position: "relative",
    bottom: 3
  }
});

class BetweenReport extends Component {
  state = {
    rideData: [],
    ticketData: [],
    maintData: [],
    rainData: [],
    from: null,
    to: null,
  }

  fixMonth(date){
    if(date.getMonth()+1 < 10){
        return "0" + (date.getMonth() +1);
    }
    else{
        return date.getMonth() + 1;
    }
  }

  fetchRideInfo() {
    let fromDate = this.state.from;
    fromDate = fromDate.getFullYear() + '-' + (this.fixMonth(fromDate)) + '-' + fromDate.getDate();
    let toDate = this.state.to;
    toDate = toDate.getFullYear() + '-' + (this.fixMonth(toDate)) + '-' + toDate.getDate();
    fetch(`http://157.230.172.23:4000/ridesbetween/${fromDate}&${toDate}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.ridesBetween}))
  }

  fetchTicketInfo() {
    let fromDate = this.state.from;
    fromDate = fromDate.getFullYear() + '-' + (this.fixMonth(fromDate)) + '-' + fromDate.getDate();
    let toDate = this.state.to;
    toDate = toDate.getFullYear() + '-' + (this.fixMonth(toDate)) + '-' + toDate.getDate();
    fetch(`http://157.230.172.23:4000/ticketsbetween/${fromDate}&${toDate}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({ticketData: result.ticketsBetween}))
  }
  
  fetchMaintInfo() {
    let fromDate = this.state.from;
    fromDate = fromDate.getFullYear() + '-' + (this.fixMonth(fromDate)) + '-' + fromDate.getDate();
    let toDate = this.state.to;
    toDate = toDate.getFullYear() + '-' + (this.fixMonth(toDate)) + '-' + toDate.getDate();
    fetch(`http://157.230.172.23:4000/maintenancebetween/${fromDate}&${toDate}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({maintData: result.maintBetween}))
  }

  fetchRainInfo() {
    let fromDate = this.state.from;
    fromDate = fromDate.getFullYear() + '-' + (this.fixMonth(fromDate)) + '-' + fromDate.getDate();
    let toDate = this.state.to;
    toDate = toDate.getFullYear() + '-' + (this.fixMonth(toDate)) + '-' + toDate.getDate();
    fetch(`http://157.230.172.23:4000/rainoutsbetween/${fromDate}&${toDate}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rainData: result.rainBetween}))
  }

  handleChange= (name,event) => {
    this.setState({[name] : event})
  }

  buttonSubmit () {
    this.fetchRainInfo();
    this.fetchMaintInfo();
    this.fetchTicketInfo();
    this.fetchRideInfo();
  }

  renderTicketData = ({tickets_sold }) => (
    <TableRow key={Math.random() * 100}>
      <TableCell>{tickets_sold}</TableCell>
      <TableCell align="right">${tickets_sold * 35}.00</TableCell>
    </TableRow>
  )

  renderRainoutData = ({rainoutDate }) => (
    <TableRow key={Math.random() * 100}>
      <TableCell>{rainoutDate}</TableCell>
    </TableRow>
  )

  renderMaintData = ({RideName, OrderCount }) => (
    <TableRow key={Math.random() * 100}>
      <TableCell>{RideName}</TableCell>
      <TableCell align="right">{OrderCount}</TableCell>
    </TableRow>
  )

  render() {
    const { classes } = this.props;
    const { ticketData } = this.state;
    const { maintData } = this.state;
    const { rideData } = this.state;
    const { rainData } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell align="center" className={classes.header}>Report Generator</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <DatePicker style={{marginRight: 10}}
                  required
                  label="From:"
                  value={this.state.from}
                  onChange={e => this.handleChange("from",e)}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <DatePicker style={{marginRight: 10}}
                  required
                  label="To:"
                  value={this.state.to}
                  onChange={e => this.handleChange("to",e)}
                  />
                </MuiPickersUtilsProvider>
                <Button variant="contained" style={{marginTop: 5}}
                onClick={() => this.buttonSubmit()}
                >
                Submit
                </Button>
                </TableCell>
              </TableRow>
            </TableHead>            
          </Table>
          <div style={{maxHeight: 330, overflowY: 'auto'}}>
          <Table >
          <TableBody className={classes.table}>
            <TableRow>
                <TableCell style={{fontSize: 17}}>Ticket Report</TableCell>
              </TableRow>
          </TableBody>
          </Table>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell>Tickets Sold</TableCell>
                <TableCell align='right'>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {ticketData.map(this.renderTicketData)}
            </TableBody>
          </Table>
          <Table >
          <TableBody className={classes.table}>
            <TableRow>
                <TableCell style={{fontSize: 17}}>Ride Report</TableCell>
              </TableRow>
          </TableBody>
          </Table>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell>Ride</TableCell>
                <TableCell align='right'># of Riders</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {ticketData.map(this.renderTicketData)}
            </TableBody>
          </Table>
          <Table >
          <TableBody className={classes.table}>
            <TableRow>
                <TableCell style={{fontSize: 17}}>Maintenance Report</TableCell>
              </TableRow>
          </TableBody>
          </Table>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell>Ride</TableCell>
                <TableCell align='right'># Of Maintenances</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {maintData.map(this.renderMaintData)}
            </TableBody>
          </Table>
          <Table >
          <TableBody className={classes.table}>
            <TableRow>
                <TableCell style={{fontSize: 17}}>Rainout Report</TableCell>
              </TableRow>
          </TableBody>
          </Table>
          <Table>
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rainData.map(this.renderRainoutData)}
            </TableBody>
          </Table>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

BetweenReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BetweenReport);
