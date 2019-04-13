import React, { Component } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CheckCircle, Cancel } from "@material-ui/icons";
import ToolTip from '@material-ui/core/Tooltip';

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
    fontSize: 24,
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

class RideStatus extends Component {
  state = {
    statusData: [],
    totalRevenue: 0,
    yearList: [],
    monthList: [],
    selectedyear: 0,
    selectedmonth: 0
  };

  componentDidMount() {
    this.fetchRideList();
  }

  fetchRideList() {
    fetch(`http://157.230.172.23:4000/ridelist`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => this.setState({ statusData: result.rideList }));
  }

  renderRideStatus = ({ RideName, NeedMaintenance }) => (
  <ToolTip key={RideName} title={ NeedMaintenance > 0 ? "Maintenance Required" : "Operational"}>
    <TableCell align="center">
        {NeedMaintenance > 0 ? (
            <Cancel
              style={{
                color: "red",
                fontSize: 18,
                position: "relative",
                bottom: 3
              }}
            />
        ) : (
            <CheckCircle
              style={{
                color: "green",
                fontSize: 18,
                position: "relative",
                bottom: 3
              }}
            />
        )}
        <span style={{ fontSize: 16, fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>{RideName}</span>
    </TableCell>
    </ToolTip>
  );

  render() {
    const { classes } = this.props;
    const { statusData } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.header}>Ride Status</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table className={classes.table}>
          <TableBody>
            <TableRow>{statusData.map(this.renderRideStatus)}</TableRow>
          </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

RideStatus.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RideStatus);
