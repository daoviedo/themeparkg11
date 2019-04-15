import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { TextField, MenuItem } from "@material-ui/core";
// prettier-ignore
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "40%",
    maxHeight: 500,
    marginTop: 20,
    margin: "auto",
    overflowX: "auto",
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
  header2: {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    fontSize: 17
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

class SalesReport extends Component {
  state = {
    data: [],
    ridedata: [],
    rideList: [],
    dataVal: "Year",
    yearList: [],
    monthList: [],
    selectedyear: 0,
    selectedmonth: 0
  };
  
  componentDidMount() {
    this.fetchYearInfo();
    this.fetchYearList();
    this.fetchPivot();
    this.fetchRideList();
  }

  fetchPivot() {
    fetch(`http://157.230.172.23:4000/newridepivot`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ ridedata: result.data }));
  }

  fetchRideList() {
    fetch(`http://157.230.172.23:4000/ridelist`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ rideList: result.rideList }))
      .catch(err => console.log(err));
  }

  fetchYearInfo() {
    fetch(`http://157.230.172.23:4000/yearanalytics`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ data: result.data, dataVal: "Year" }))
      .catch(err => console.log(err));
  }

  fetchMonthInfo(year) {
    fetch(`http://157.230.172.23:4000/monthanalytics/${year}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ data: result.data, dataVal: "Month" }))
      .catch(err => console.log(err));
  }

  fetchDayInfo(month) {
    fetch(
      `http://157.230.172.23:4000/dayanalytics/${
        this.state.selectedyear
      }/${month}`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(result => this.setState({ data: result.data, dataVal: "Day" }))
      .catch(err => console.log(err));
  }

  fetchYearList() {
    fetch(`http://157.230.172.23:4000/selyear`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ yearList: result.years }))
      .catch(err => console.log(err));
  }

  fetchMonthList(year) {
    fetch(`http://157.230.172.23:4000/selmonth/${year}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ monthList: result.data }))
      .catch(err => console.log(err));
  }

  handleChange = event => {
    if (event.target.value === 0) {
      this.setState({
        selectedmonth: 0,
        monthList: [],
        [event.target.name]: event.target.value
      });
      this.fetchYearInfo();
    } else {
      this.setState({
        selectedmonth: 0,
        [event.target.name]: event.target.value
      });
      this.fetchMonthInfo(event.target.value);
      this.fetchMonthList(event.target.value);
    }
  }

  handleChangemon = event => {
    if (event.target.value === 0) {
      this.setState({ [event.target.name]: event.target.value });
      this.fetchMonthInfo(this.state.selectedyear);
    } else {
      this.setState({ [event.target.name]: event.target.value });
      this.fetchDayInfo(event.target.value);
    }
  }
  
  renderSales = ({year, month, dayname, tickets_sold}) => {
    
    if (this.state.dataVal === 'Year') {
      return (
        <TableRow key={Math.random() * 100}>
          <TableCell>{year}</TableCell>
          <TableCell align="right">{tickets_sold}</TableCell>
          <TableCell align="right">${tickets_sold * 35}.00</TableCell>
        </TableRow>
      )
    } 
    else if (this.state.dataVal === 'Month') {
      return (
        <TableRow key={Math.random() * 100}>
          <TableCell>{month}</TableCell>
          <TableCell align="right">{tickets_sold}</TableCell>
          <TableCell align="right">${tickets_sold * 35}.00</TableCell>
        </TableRow>
      )
    }
    else if (this.state.dataVal === 'Day') {
      return (
        <TableRow key={Math.random() * 100}>
          <TableCell>{dayname}</TableCell>
          <TableCell align="right">{tickets_sold}</TableCell>
          <TableCell align="right">${tickets_sold * 35}.00</TableCell>
        </TableRow>
      )
    }
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.header}>Ticket Sales</TableCell>
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell align="center">
              <TextField
                select
                required
                label="Select a year"
                name="selectedyear"
                onChange={this.handleChange}
                value={this.state.selectedyear}
                style={{ width: 200, marginBottom: 10 }}
              >
                <MenuItem value={0}>All</MenuItem>
                {this.state.yearList.map(option => (
                  <MenuItem key={option.year} value={option.year}>
                    {option.year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                disabled={this.state.selectedyear === 0}
                select
                required
                label="Select a month"
                name="selectedmonth"
                onChange={this.handleChangemon}
                value={this.state.selectedmonth}
                style={{ width: 200, marginBottom: 10 }}
              >
                <MenuItem value={0}>All</MenuItem>
                {this.state.monthList.map(option => (
                  <MenuItem key={option.month} value={option.month}>
                    {option.month}
                  </MenuItem>
                ))}
              </TextField>
              </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <div style={{maxHeight: 330, overflowY: 'auto'}}>
          <Table className={classes.table}>
            <TableHead>
            <TableRow>
              <TableCell className={classes.header2}>{this.state.dataVal}</TableCell>
              <TableCell align="right" className={classes.header2}>Tickets Sold</TableCell>
              <TableCell align="right" className={classes.header2}>Revenue</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                  {data.map(this.renderSales)}
            </TableBody>
            </Table>
            </div>
        </Paper>
      </React.Fragment>
    );
  }
}

SalesReport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SalesReport);
