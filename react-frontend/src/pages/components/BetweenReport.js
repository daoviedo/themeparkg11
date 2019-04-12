import React, { Component }  from 'react';
import PropTypes from "prop-types";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import { withStyles } from "@material-ui/core/styles";
//prettier-ignore
import { TextField, MenuItem } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
//prettier-ignore
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

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
    from: 0,
    to: 0,
  }

  componentDidMount() {
    this.fetchRideInfo();
    this.fetchTicketInfo();
    this.fetchMaintInfo();
    this.fetchRainInfo();
  }

  fetchRideInfo() {
    fetch(`http://157.230.172.23:4000/ridesbetween/:${this.state.from}&:${this.state.to}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }

  fetchTicketInfo() {
    fetch(`http://157.230.172.23:4000/ticketsbetween/:${this.state.from}&:${this.state.to}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }
  
  fetchMaintInfo() {
    fetch(`http://157.230.172.23:4000/maintenancebetween/:${this.state.from}&:${this.state.to}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }

  fetchRainInfo() {
    fetch(`http://157.230.172.23:4000/rainoutsbetween/:${this.state.from}&:${this.state.to}`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }


  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell align="center" className={classes.header}>Report Generator</TableCell>
            </TableHead>
                <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                  <DatePicker
                  required
                  label="From:"
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                  <DatePicker
                  required
                  label="To:"
                  />
                </MuiPickersUtilsProvider>
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
