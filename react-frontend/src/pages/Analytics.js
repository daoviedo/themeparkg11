import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import TopBar from './components/TopBar';
import {TextField, MenuItem} from '@material-ui/core';

import RideAnalytics from './RideAnalytics';

class Analytics extends Component {
    state = {
        data: [],
        ridedata: [],
        rideList: [],
        dataVal: "year",
        yearList: [],
        monthList: [],
        selectedyear: 0,
        selectedmonth: 0
    }
    componentDidMount(){
        this.fetchYearInfo();
        this.fetchYearList();
        this.fetchPivot();
        this.fetchRideList();
    }

    fetchPivot() {
        fetch(`http://157.230.172.23:4000/ridepivot`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({ridedata: result.data}))
    }
    
    fetchRideList() {
        fetch(`http://157.230.172.23:4000/ridelist`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({rideList: result.rideList}))
        .catch(err => console.log(err))
    }

    fetchYearInfo(){
        fetch(`http://157.230.172.23:4000/yearanalytics`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ data: result.data, dataVal: "year" }))
            .catch(err => console.log(err))
    }

    fetchMonthInfo(year){
        fetch(`http://157.230.172.23:4000/monthanalytics/${year}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ data: result.data, dataVal: "month" }))
            .catch(err => console.log(err))
    }

    fetchDayInfo(month){
        fetch(`http://157.230.172.23:4000/dayanalytics/${this.state.selectedyear}/${month}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ data: result.data, dataVal: "dayname" }))
            .catch(err => console.log(err))
    }

    fetchYearList(){
        fetch(`http://157.230.172.23:4000/selyear`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ yearList: result.years }))
            .catch(err => console.log(err))
    }

    fetchMonthList(year){
        fetch(`http://157.230.172.23:4000/selmonth/${year}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ monthList: result.data }))
            .catch(err => console.log(err))
    }

    handleChange = event => {
        if(event.target.value===0){
            this.setState({selectedmonth: 0, monthList: [],[event.target.name]: event.target.value});
            this.fetchYearInfo();
        }
        else{
            this.setState({selectedmonth: 0,[event.target.name]: event.target.value});
            this.fetchMonthInfo(event.target.value);
            this.fetchMonthList(event.target.value);
        }
        
    }
    handleChangemon = event => {
        if(event.target.value===0){
            this.setState({[event.target.name]: event.target.value});
            this.fetchMonthInfo(this.state.selectedyear);
        }
        else{   
            this.setState({[event.target.name]: event.target.value});
            this.fetchDayInfo(event.target.value);
        } 
    }

    render() {
        return (
            <React.Fragment>
                <TopBar/>
                
                <div style={{textAlign: "center", paddingBottom: 100}}>
                    
                    <br/>
                <TextField select required label="Select a year" name="selectedyear" onChange={this.handleChange} value={this.state.selectedyear} style={{width: 200, marginBottom: 10}}>
                            <MenuItem value={0}>
                            All
                            </MenuItem>
                        {this.state.yearList.map(option => (
                            <MenuItem key={option.year} value={option.year}>
                            {option.year}
                            </MenuItem>
                            )
                        )}
                </TextField>
                <TextField disabled={this.state.selectedyear===0} select required label="Select a month" name="selectedmonth" onChange={this.handleChangemon} value={this.state.selectedmonth} style={{width: 200, marginBottom: 10}}>
                            <MenuItem value={0}>
                            All
                            </MenuItem>
                        {this.state.monthList.map(option => (
                            <MenuItem key={option.month} value={option.month}>
                            {option.month}
                            </MenuItem>
                            )
                        )}
                </TextField>
                <h2>Ticket Sale Analytics</h2>
                    <BarChart
                width={800}
                height={500}
                data={this.state.data}
                style={{margin: 'auto'}}
                margin={{left: 0, right: 60}}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={this.state.dataVal}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets_sold" fill="#2F4F4F"/>
            </BarChart>
            <h2>Ride Analytics</h2>
            <RideAnalytics data={this.state.ridedata} rides={this.state.rideList}/>
                </div>
            </React.Fragment>  
        );
    }
}

export default Analytics;