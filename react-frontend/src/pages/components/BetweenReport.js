import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';

const TealTheme = createMuiTheme({
  palette: {
    primary: {main: purple[900]},
  },
  overrides: {
      MuiPickersDay: {
        day: {
          color: purple[900],
        },
        isSelected: {
          backgroundColor: purple["900"],
        },
        current: {
          color: purple["900"],
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: purple["900"],
        },
      },
    },
});

const styles = theme => ({
  root: {
    width: "70%",
    maxHeight: 500,
    marginTop: 20,
    margin: "auto",
    overflowX: "auto",
    overflowY: "auto"
  },
  table: {
    minWidth: 500
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

  renderMonthSales = ({tickets_sold }) => (
    <TableRow>
      <TableCell>{tickets_sold}</TableCell>
      <TableCell>{tickets_sold * 35}</TableCell>
    </TableRow>
  )

  render() {
    console.log(this.state);
    const { classes } = this.props;
    const { ticketData } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
              <TableCell align="center" className={classes.header}>Report Generator</TableCell>
              </TableRow>
              <TableRow>
              <div style={{ textAlign: "center", paddingVertical: 100 }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                  <DatePicker
                  required
                  label="From:"
                  value={this.state.from}
                  onChange={e => this.handleChange("from",e)}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                  <DatePicker
                  required
                  label="To:"
                  value={this.state.to}
                  onChange={e => this.handleChange("to",e)}
                  />
                </MuiPickersUtilsProvider>
                <Button
                onClick={() => this.buttonSubmit()}
                >
                Submit
                </Button>
              </div>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell>Ticket Sales</TableCell>
              </TableRow>
                {ticketData.map(this.renderMonthSales)}
              <TableRow>
                <TableCell>Ride Report</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maintenance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rainout</TableCell>
              </TableRow>
            </TableBody>
              
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

BetweenReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BetweenReport);
