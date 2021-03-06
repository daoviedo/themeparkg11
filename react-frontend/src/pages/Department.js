import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { TextField, withStyles, MenuItem} from '@material-ui/core';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import AddEmployeeDialogue from './components/AddEmployeeDialogue';

const styles = theme => ({
    root: {
        width: '70%',
        maxHeight: 500,
        marginTop: 10,
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

class Department extends Component{
    state = {
        deptList: [],
        listOfRides: [],
        empList: [],
        userID: 1,
        openDialogue: false,
        selectedDept: 0,
        dialogueDept: "",
        firstname: "",
        lastname: "",
    }
    componentDidMount(){
        this.fetchDepartments();
        this.fetchEmployees(0);
    }
    handleChange = (name, value) => {
        this.setState({[name]: value});
    }
    handleChangeDept = (name, value) => {
        this.setState({[name]: value});
        this.fetchEmployees(value);
    }
    handleClickOpen = () => {
        this.setState({ openDialogue: true });
    };
    handleClose = () => {
        this.setState({ openDialogue: false, firstname: "", lastname: "", dialogueDept: ""});
    };
    fetchEmployees(value){
        if(value === 0){
            fetch(`http://api.themepark.ga/getallemps`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ empList: result.status }))
            .catch(err => console.log(err))
        }
        else{
            fetch(`http://api.themepark.ga/getallemp/${value}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ empList: result.status }))
            .catch(err => console.log(err))
        }
    }
    fetchDepartments(){
        fetch(`http://api.themepark.ga/departmentlist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ deptList: result.dList }))
            .catch(err => console.log(err))
    }
    validateInput(){
        return(this.state.firstname.length > 1 && this.state.lastname.length > 1)
    }
    submitForm = () => {
        fetch(`http://api.themepark.ga/newemployee`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dept: this.state.dialogueDept,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            }),
        })
        .then(()=>this.fetchEmployees(this.state.selectedDept))
        .then(this.handleClose())
        .catch(err => console.log(err))
    };

    fixManager(eid, mid, Mfn, Mln){
        if(eid === mid){
            return "MANAGER";
        }
        else{
            return Mfn + " " + Mln;
        }
    }

    renderMainList = ({ Name, EmployeeID, FirstName, LastName, MFirstName, MLastName, ManagerID }) =>
        <TableRow key={EmployeeID}>
            <TableCell component="th" scope="row">
                {Name}
            </TableCell>
            <TableCell align="right">{EmployeeID}</TableCell>
            <TableCell align="right">{FirstName + " " + LastName}</TableCell>
            <TableCell align="right">{this.fixManager(EmployeeID,ManagerID, MFirstName, MLastName)}</TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { empList } = this.state;
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <TextField select label="Department" name="selectedDept" onChange={e=>this.handleChangeDept('selectedDept',e.target.value)} value={this.state.selectedDept} style={{width: 200}}>
                        <MenuItem value={0}>
                            All Employees
                        </MenuItem>
                    {this.state.deptList.map(option => (
                            <MenuItem key={option.DeptID} value={option.DeptID}>
                            {option.Name}
                            </MenuItem>
                            )
                        )}
                    </TextField>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.header}>Department</TableCell>
                                    <TableCell align="right" className={classes.header}>Employee ID</TableCell>
                                    <TableCell align="right" className={classes.header}>Name</TableCell>
                                    <TableCell align="right" className={classes.header}>Manager</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {empList.map(this.renderMainList)}
                        </TableBody>
                    </Table>
                </Paper>
                <br/>
                <AddEmployeeDialogue handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} submitForm={this.submitForm} handleChange={this.handleChange} val={this.state}/>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Department);