import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { TextField, withStyles, MenuItem} from '@material-ui/core';
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import AddEmployeeDialogue from './components/AddEmployeeDialogue';

const styles = theme => ({
    root: {
        width: '70%',
        maxHeight: 500,
        marginTop: 100,
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
        selectedDept: "",
        firstname: "",
        lastname: "",
    }
    componentDidMount(){
        this.fetchDepartments();
        this.fetchEmployees();
    }
    handleChange = (name, value) => {
        this.setState({[name]: value});
    }
    handleClickOpen = () => {
        this.setState({ openDialogue: true });
    };
    handleClose = () => {
        this.setState({ openDialogue: false, firstname: "", lastname: ""});
    };
    fetchEmployees(){
        fetch(`http://157.230.172.23:4000/emplist`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ empList: result.employeeList }))
            .catch(err => console.log(err))
    }
    fetchDepartments(){
        fetch(`http://157.230.172.23:4000/departmentlist`, {
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
        fetch(`http://157.230.172.23:4000/newemployee`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dept: this.state.selectedDept,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            }),
        })
        .then(()=>this.fetchDepartments())
        .then(this.handleClose())
        .catch(err => console.log(err))
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TopBar/>
                <div style={{textAlign: "center"}}>
                    <h1>This is The Department Page</h1>
                    <TextField select label="Department" name="selectedDept" onChange={this.handleChange} value={this.state.selectedDept} style={{width: 200}}>
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
                                    <TableCell className={classes.header}>Employee ID</TableCell>
                                    <TableCell className={classes.header}>Name</TableCell>
                                    <TableCell className={classes.header}>Manager</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody >
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