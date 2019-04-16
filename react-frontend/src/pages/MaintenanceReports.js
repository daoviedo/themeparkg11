import React, {Component} from 'react';
import TopBar from './components/TopBar';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { TextField, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';

class MaintenanceReports extends Component{
    state={
        toDate: null,
        fromDate: null,
        rideList: [],
        mList: [],
        selectedRide: "all"
    }
    fixDate(date){
        if(date.getDate() < 10){
          return "0" + date.getDate();
        }
        else{
          return date.getDate();
        }
      }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value}, () =>
        {
            this.fetchmaintenance(this.state.toDate,this.state.fromDate, this.state.selectedRide)
        });
    }
    componentDidMount(){
        this.fetchrides();
        this.fetchmaintenance(this.state.toDate, this.state.fromDate, this.state.selectedRide);
    }
    fixMonth(date){
        if(date.getMonth()+1 < 10){
            return "0" + (date.getMonth() +1);
        }
        else{
            return date.getMonth() + 1;
        }
    }
    fetchmaintenance(t, f, id){
        var tdate = t;
        var fdate = f;
        if(this.state.toDate !== null)
        {
            tdate = t.getFullYear()+"-"+this.fixMonth(t)+"-"+this.fixDate(t);
        }
        if(this.state.fromDate !== null)
        {
            fdate = f.getFullYear()+"-"+this.fixMonth(f)+"-"+this.fixDate(f);
        }
        fetch(`http://api.themepark.ga/ridemaintenancebetween`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rideid: id,
                to: tdate,
                from: fdate,
            }),
        })
        .then(res => res.json())
        .then(result => this.setState({ mList: result.maintlist }))
        .catch(err => console.log(err))
    }
    fetchrides()
    {
        fetch(`http://api.themepark.ga/ridelist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rideList: result.rideList }))
            .catch(err => console.log(err))
    }
    renderlist({OrderID, RideID, RideName, DateCreated, DateCompleted, Maintenance_Desc, issuedByF, issuedByL, completedByF, completedByL})
    {
        if(DateCompleted !== null)
        {
        return(
        <TableRow key={OrderID}>
            <TableCell>{RideName}</TableCell>
            <TableCell align="right">{DateCreated.split(".")[0]}</TableCell>
            <TableCell align="right">{DateCompleted.split(".")[0]}</TableCell>
            <TableCell align="right">{issuedByF + " " + issuedByL}</TableCell>
            <TableCell align="right">{completedByF + " " + completedByL}</TableCell>
            <TableCell align="right">{Maintenance_Desc}</TableCell>
        </TableRow>
        )}
        else if (DateCompleted === null)
        {
            return(
            <TableRow key={OrderID}>
                <TableCell>{RideName}</TableCell>
                <TableCell align="right">{DateCreated.split(".")[0]}</TableCell>
                <TableCell align="right">N/A</TableCell>
                <TableCell align="right">{issuedByF + " " + issuedByL}</TableCell>
                <TableCell align="right">N/A</TableCell>
                <TableCell align="right">{Maintenance_Desc}</TableCell>
            </TableRow>
            )
        }
    }
    handleChangeDate= (name,event) => {
        this.setState({[name] : event}, () => {
            this.fetchmaintenance(this.state.toDate,this.state.fromDate, this.state.selectedRide)
    })}
    render(){
        return(
            <div>
           <TopBar/>
            <div style={{textAlign: "center", paddingTop: 50}}>
                <h2>Maintenance Reporting</h2>
                <br/>
                <Grid container spacing = {32} justify = "center" alignItems = "center">
                <TextField select label="Ride" name="selectedRide" onChange={this.handleChange} value={this.state.selectedRide} style={{width: 200}}>
                <MenuItem key = {0} value = {'all'}/>
                {this.state.rideList.map(option => (
                    <MenuItem key={option.RideID} value={option.RideID}>
                    {option.RideName}
                    </MenuItem>
                    )
                )}
                </TextField>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <DatePicker style={{margin: 20}}
                  required
                  label="From:"
                  value={this.state.fromDate}
                  onChange={e => this.handleChangeDate("fromDate", e)}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <DatePicker style={{margin: 20}}
                  required
                  label="To:"
                  value={this.state.toDate}
                  onChange={e => this.handleChangeDate("toDate",e)}
                  />
                </MuiPickersUtilsProvider>
                </Grid>
                <br/>
                <Paper style={{width:'90%', margin: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ride Name</TableCell>
                                <TableCell align = "right">Date Issued</TableCell>
                                <TableCell align = "right">Date Completed</TableCell>
                                <TableCell align = "right">Issued By</TableCell>
                                <TableCell align = "right">Completed By</TableCell>
                                <TableCell align = "right">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.mList.map(this.renderlist)}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            </div>
        )
    }
}

export default MaintenanceReports;