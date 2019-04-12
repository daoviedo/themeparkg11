import React, { Component } from 'react';
import TopBar from './components/TopBar';
//prettier-ignore
import { TextField, MenuItem } from "@material-ui/core";
//prettier-ignore
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

class BetweenReport extends Component {
  state = {
    rideData: [],
    ticketData: [],
    maintData: [],
    rainData: [],
  }

  componentDidMount() {
    this.fetchRideInfo();
    this.fetchTicketInfo();
    this.fetchMaintInfo();
    this.fetchRainData();
  }

  fetchRideInfo() {
    fetch(`http://157.230.172.23:4000/newridepivot`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }

  fetchRideInfo() {
    fetch(`http://157.230.172.23:4000/newridepivot`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }
  
    fetch(`http://157.230.172.23:4000/newridepivot`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }

  fetchRideInfo() {
    fetch(`http://157.230.172.23:4000/newridepivot`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(result => this.setState({rideData: result.data}))
  }
  
}
