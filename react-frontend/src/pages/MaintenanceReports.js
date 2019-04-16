import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TopBar from './components/TopBar';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TextField, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination} from '@material-ui/core';

const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
  });

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };
  
    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };
  
    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };
  
    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };
  
    render() {
      const { classes, count, page, rowsPerPage, theme } = this.props;
  
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
  }
  TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
  );
class MaintenanceReports extends Component{
    state={
        toDate: null,
        fromDate: null,
        rideList: [],
        mList: [],
        selectedRide: "all",
        page: 0,
        rowsPerPage: 20,
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
    clearDates=()=>{
        this.setState({toDate: null, fromDate: null}, () => {
            this.fetchmaintenance(this.state.toDate, this.state.fromDate, this.state.selectedRide)
        })
    }
    handleChangeDate= (name,event) => {
        this.setState({[name] : event}, () => {
            this.fetchmaintenance(this.state.toDate,this.state.fromDate, this.state.selectedRide)
    })}
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
      handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
      };
    render(){
        const{mList, page, rowsPerPage} = this.state
        return(
            <div>
           <TopBar/>
            <div style={{textAlign: "center", paddingTop: 50}}>
                <h2>Maintenance History</h2>
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
                <Button variant = "outlined" onClick={this.clearDates}>Clear Dates</Button>
                </Grid>
                <br/>
                <Paper style={{width:'90%', margin: 'auto'}}>
                    <Table>
                        <TableHead style={{backgroundColor: "#2F4F4F"}}>
                            <TableRow style={{color: "white"}}>
                                <TableCell style={{color: "white", fontSize: 15}}>Ride Name</TableCell>
                                <TableCell style={{color: "white", fontSize: 15}} align = "right">Date Issued</TableCell>
                                <TableCell style={{color: "white", fontSize: 15}} align = "right">Date Completed</TableCell>
                                <TableCell style={{color: "white", fontSize: 15}} align = "right">Issued By</TableCell>
                                <TableCell style={{color: "white", fontSize: 15}} align = "right">Completed By</TableCell>
                                <TableCell style={{color: "white", fontSize: 15}} align = "right">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(this.renderlist)}
                        </TableBody>
                    </Table>
                    <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={this.state.mList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                    />
                </Paper>
                <br/>
            </div>
            </div>
        )
    }
}

export default MaintenanceReports;